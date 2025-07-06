"use client";

import { personalizedAgendaBuilder, PersonalizedAgendaBuilderOutput } from "@/ai/flows/personalized-agenda-builder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { eventSessions } from "@/lib/data";
import { Calendar, Clock, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";

export function AgendaClient() {
  const [interests, setInterests] = useState("Generative AI, Vector Databases");
  const [goals, setGoals] = useState("Find co-founders and learn about scaling AI applications.");
  const [agenda, setAgenda] = useState<PersonalizedAgendaBuilderOutput['recommendedSessions'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateAgenda = async () => {
    setIsLoading(true);
    setAgenda(null);
    try {
      const result = await personalizedAgendaBuilder({
        interests: interests.split(',').map(i => i.trim()),
        goals,
        availability: [
          { startTime: new Date(new Date().setHours(8, 0, 0, 0)).toISOString(), endTime: new Date(new Date().setHours(18, 0, 0, 0)).toISOString() }
        ],
        sessions: eventSessions,
      });
      setAgenda(result.recommendedSessions);
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

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Your Preferences</CardTitle>
            <CardDescription>Enter your details to generate a personalized agenda.</CardDescription>
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
              Generate My Agenda
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Recommended Schedule</h2>
        {isLoading && (
           <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-12 w-1 bg-gray-200 rounded-full" />
                  <div className="w-full p-4 border rounded-lg bg-gray-50 animate-pulse">
                     <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                     <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
            ))}
           </div>
        )}
        {!isLoading && agenda && agenda.length > 0 && (
          <div className="space-y-4 relative">
             <div className="absolute left-4 top-0 h-full w-0.5 bg-border -z-10" />
            {agenda.map((session, index) => (
              <div key={index} className="flex items-start gap-4 ml-4">
                <div className="mt-1 flex-shrink-0 bg-primary w-4 h-4 rounded-full border-4 border-background" />
                <div className="flex-1 -mt-1.5">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{session.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 pt-1">
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(session.startTime).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {formatTime(session.startTime)} - {formatTime(session.endTime)}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-primary italic">
                        <Sparkles className="inline-block w-4 h-4 mr-2" />
                        {session.reason}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        )}
        {!isLoading && (!agenda || agenda.length === 0) && (
            <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg">
                <Calendar className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">Your Agenda Awaits</h3>
                <p className="text-muted-foreground">Fill in your preferences and click generate to see your personalized schedule.</p>
            </div>
        )}
      </div>
    </div>
  );
}
