
"use client";

import { personalizedAgendaBuilder, PersonalizedAgendaBuilderOutput } from "@/ai/flows/personalized-agenda-builder";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { eventSessions } from "@/lib/data";
import { AlertTriangle, Calendar, Check, Clock, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { StarRating } from "@/components/star-rating";
import { Badge } from "@/components/ui/badge";
import { isToday, isThisWeek, isThisMonth, parseISO } from 'date-fns';

type Session = PersonalizedAgendaBuilderOutput['recommendedSessions'][0];

export function AgendaClient() {
  const [interests, setInterests] = useState("Generative AI, Vector Databases, AI Ethics");
  const [goals, setGoals] = useState("Find co-founders and learn about scaling AI applications.");
  const [agenda, setAgenda] = useState<PersonalizedAgendaBuilderOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [sessionFeedback, setSessionFeedback] = useState<Record<string, { rating: number; notes: string }>>({});

  const [todaySessions, setTodaySessions] = useState<Session[]>([]);
  const [weekSessions, setWeekSessions] = useState<Session[]>([]);
  const [monthSessions, setMonthSessions] = useState<Session[]>([]);

  const handleFeedbackChange = (sessionId: string, rating?: number, notes?: string) => {
    setSessionFeedback(prev => ({
        ...prev,
        [sessionId]: {
            rating: rating ?? prev[sessionId]?.rating ?? 0,
            notes: notes ?? prev[sessionId]?.notes ?? '',
        }
    }));
  };

  const handleGenerateAgenda = async () => {
    setIsLoading(true);
    setAgenda(null);
    setTodaySessions([]);
    setWeekSessions([]);
    setMonthSessions([]);
    try {
      const result = await personalizedAgendaBuilder({
        interests: interests.split(',').map(i => i.trim()),
        goals,
        availability: [
          { startTime: new Date(new Date().setHours(8, 0, 0, 0)).toISOString(), endTime: new Date(new Date().setHours(18, 0, 0, 0)).toISOString() }
        ],
        sessions: eventSessions,
      });
      setAgenda(result);

      if (result && result.recommendedSessions) {
        const today: Session[] = [];
        const thisWeek: Session[] = [];
        const thisMonth: Session[] = [];

        result.recommendedSessions.forEach(session => {
            const sessionDate = parseISO(session.startTime);
            if (isToday(sessionDate)) {
                today.push(session);
            } else if (isThisWeek(sessionDate, { weekStartsOn: 1 })) {
                thisWeek.push(session);
            } else if (isThisMonth(sessionDate)) {
                thisMonth.push(session);
            }
        });
        setTodaySessions(today);
        setWeekSessions(thisWeek);
        setMonthSessions(thisMonth);
      }
    } catch (error) {
      console.error("Failed to generate agenda:", error);
      toast({
        title: "Error",
        description: "Could not generate your agenda. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  const SessionTimeline = ({ sessions }: { sessions: Session[] }) => (
    <div className="relative border-l-2 border-dashed border-primary/20 pl-8 space-y-8">
      {sessions.map((session, index) => (
        <Dialog key={index}>
           <div className="relative">
             <div className="absolute -left-[1.1rem] top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
               <Calendar className="h-4 w-4" />
             </div>
             <div className="pl-4">
               <p className="font-bold text-primary">{formatTime(session.startTime)} - {formatTime(session.endTime)}</p>
               <DialogTrigger asChild>
                 <Card className="mt-2 transition-shadow hover:shadow-lg cursor-pointer">
                   <CardHeader>
                     <div className="flex justify-between items-start">
                         <div>
                           <CardTitle>{session.title}</CardTitle>
                           <CardDescription>
                             {new Date(session.startTime).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                           </CardDescription>
                         </div>
                          <Badge variant="outline">
                           <Check className="w-3 h-3 mr-1.5" />
                           Scheduled
                          </Badge>
                     </div>
                   </CardHeader>
                   <CardContent>
                       <p className="text-sm text-muted-foreground italic flex items-start gap-2 bg-secondary/30 p-3 rounded-md">
                         <Sparkles className="inline-block w-4 h-4 mr-1 text-primary flex-shrink-0 mt-0.5" />
                         <span>{session.reason}</span>
                       </p>
                   </CardContent>
                 </Card>
               </DialogTrigger>
             </div>
           </div>
           <DialogContent className="sm:max-w-md">
             <DialogHeader>
               <DialogTitle>{session.title}</DialogTitle>
               <DialogDescription>Rate this session and save your notes.</DialogDescription>
             </DialogHeader>
             <div className="space-y-6 py-4">
                 <div className="space-y-2">
                     <Label htmlFor="rating">Your Rating</Label>
                     <StarRating
                         rating={sessionFeedback[session.title]?.rating ?? 0}
                         onRatingChange={(newRating) => handleFeedbackChange(session.title, newRating)}
                     />
                 </div>
                 <div className="space-y-2">
                     <Label htmlFor="notes">Your Notes</Label>
                     <Textarea
                         id="notes"
                         placeholder="What did you learn? Any key takeaways?"
                         className="min-h-[150px]"
                         value={sessionFeedback[session.title]?.notes ?? ''}
                         onChange={(e) => handleFeedbackChange(session.title, undefined, e.target.value)}
                     />
                 </div>
             </div>
           </DialogContent>
        </Dialog>
      ))}
    </div>
  );

  const noSessionsFound = !isLoading && (!agenda || (todaySessions.length === 0 && weekSessions.length === 0 && monthSessions.length === 0));

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Your Preferences</CardTitle>
            <CardDescription>Update your details to regenerate your personalized agenda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="interests">Interests</Label>
              <Input
                id="interests"
                placeholder="e.g., AI, SaaS, Startups"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goals">Goals for the Event</Label>
              <Textarea
                id="goals"
                placeholder="e.g., Networking, Learning about new tech"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
              />
            </div>
            <Button onClick={handleGenerateAgenda} disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              {agenda ? 'Regenerate My Agenda' : 'Generate My Agenda'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Your Personalized Schedule</h2>
        {isLoading && (
           <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-12 w-1 bg-gray-200 rounded-full" />
                  <div className="w-full p-4 border rounded-lg bg-muted animate-pulse">
                     <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                     <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
            ))}
           </div>
        )}
        
        {!isLoading && !noSessionsFound && (
          <div>
            {todaySessions.length > 0 && (
                <section className="mb-12">
                    <h3 className="text-xl font-bold tracking-tight mb-6 pb-2 border-b">Today</h3>
                    <SessionTimeline sessions={todaySessions} />
                </section>
            )}
            {weekSessions.length > 0 && (
                <section className="mb-12">
                    <h3 className="text-xl font-bold tracking-tight mb-6 pb-2 border-b">This Week</h3>
                    <SessionTimeline sessions={weekSessions} />
                </section>
            )}
            {monthSessions.length > 0 && (
                <section className="mb-12">
                    <h3 className="text-xl font-bold tracking-tight mb-6 pb-2 border-b">This Month</h3>
                    <SessionTimeline sessions={monthSessions} />
                </section>
            )}
          </div>
        )}
        
        {!isLoading && agenda && agenda.conflicts && agenda.conflicts.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold tracking-tight mb-4">Scheduling Conflicts & Alternatives</h3>
            <Accordion type="single" collapsible className="w-full">
              {agenda.conflicts.map((conflict, index) => (
                <AccordionItem value={`conflict-${index}`} key={index}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-2 text-left">
                      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      <span>Conflict: {conflict.chosenSession.title} vs {conflict.conflictingSession.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 border bg-secondary/50 rounded-lg space-y-4">
                      <p className="text-sm">We noticed a scheduling conflict and recommended <strong>{conflict.chosenSession.title}</strong> based on your preferences.</p>
                      {conflict.alternativeSuggestions.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Here are some alternatives for {conflict.conflictingSession.title}:</h4>
                          <ul className="space-y-3">
                            {conflict.alternativeSuggestions.map((alt, altIndex) => (
                              <li key={altIndex} className="p-3 bg-background rounded-md border">
                                <p className="font-semibold">{alt.title}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                                  <Calendar className="w-3 h-3" /> {new Date(alt.startTime).toLocaleDateString()}
                                  <Clock className="w-3 h-3" /> {formatTime(alt.startTime)} - {formatTime(alt.endTime)}
                                </p>
                                <p className="text-sm text-primary italic flex items-start gap-2 mt-2">
                                  <Sparkles className="inline-block w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
                                  <span>{alt.reason}</span>
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {noSessionsFound && (
            <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg bg-muted/50">
                <Calendar className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">Your Agenda Awaits</h3>
                <p className="text-muted-foreground mt-1">Fill in your preferences and click generate to see your personalized schedule.</p>
            </div>
        )}
      </div>
    </div>
  );
}
