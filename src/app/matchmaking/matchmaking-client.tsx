"use client";

import { generateMatch, MatchmakingEngineOutput } from "@/ai/flows/matchmaking-engine";
import { generateMeetingWarmUp, MeetingWarmUpOutput } from "@/ai/flows/meeting-warm-up-generator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { allAttendees } from "@/lib/data";
import { Info, Loader2, MessageSquareQuote, Sparkles, Target, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";

export function MatchmakingClient() {
  const [matches, setMatches] = useState<MatchmakingEngineOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const [warmUp, setWarmUp] = useState<MeetingWarmUpOutput | null>(null);
  const [isWarmUpLoading, setIsWarmUpLoading] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<MatchmakingEngineOutput[0] | null>(null);

  useEffect(() => {
    const getMatches = async () => {
      setIsLoading(true);
      try {
        const result = await generateMatch({
          attendeeInterests: ['AI', 'SaaS'],
          attendeePersonalityTraits: ['Analytical', 'Collaborative'],
          otherAttendeeProfiles: allAttendees
        });
        setMatches(result);
      } catch (error) {
        console.error("Failed to generate matches:", error);
        toast({
          title: "Error",
          description: "Could not generate matches. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    getMatches();
  }, [toast]);
  
  const handleGenerateWarmUp = async (match: MatchmakingEngineOutput[0]) => {
    if (!match) return;
    setSelectedMatch(match);
    setIsWarmUpLoading(true);
    setWarmUp(null);
    try {
      const userProfile = {
        name: "Alex Doe",
        title: "AI Enthusiast",
        company: "AIxMeet Inc.",
        interests: ['AI', 'SaaS'],
        goals: "Find co-founders and learn about scaling AI applications."
      };

      const matchProfile = {
        name: match.attendeeName,
        title: match.title,
        company: match.company,
        interests: match.interests,
      };

      const result = await generateMeetingWarmUp({ userProfile, matchProfile });
      setWarmUp(result);
    } catch (error) {
      console.error("Failed to generate meeting warm-up:", error);
      toast({
        title: "Error",
        description: "Could not generate meeting warm-up. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsWarmUpLoading(false);
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
             <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                      <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-2 w-full bg-gray-200 rounded mt-2"></div>
                  <div className="h-3 w-5/6 bg-gray-200 rounded mt-4"></div>
                  <div className="h-3 w-4/6 bg-gray-200 rounded mt-2"></div>
                </CardContent>
                <CardFooter>
                  <div className="h-10 w-full bg-gray-200 rounded"></div>
                </CardFooter>
             </Card>
          ))}
        </div>
      )}
      {!isLoading && matches && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start gap-4">
                   <Avatar className="w-16 h-16 border-2 border-primary/20">
                    <AvatarImage src={`https://placehold.co/100x100.png?text=${match.attendeeName.charAt(0)}`} alt={match.attendeeName} />
                    <AvatarFallback>{match.attendeeName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle>{match.attendeeName}</CardTitle>
                    <CardDescription>
                       {match.title} at {match.company}
                    </CardDescription>
                     <Badge variant="outline" className="mt-2">
                        <UserCheck className="w-3 h-3 mr-1" />
                        {match.matchPercentage}% Match
                      </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <Progress value={match.matchPercentage} className="h-2 mb-4" />
                <p className="text-sm text-muted-foreground italic">
                  <Sparkles className="inline-block w-4 h-4 mr-2 text-primary" />
                  {match.matchReason}
                </p>
              </CardContent>
              <CardFooter>
                <Dialog onOpenChange={(open) => { if(open) { handleGenerateWarmUp(match) } }}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <MessageSquareQuote className="mr-2" />
                      Meeting Warm-up
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Meeting Warm-up with {selectedMatch?.attendeeName}</DialogTitle>
                      <DialogDescription>
                        Get pre-briefed with talking points for your meeting.
                      </DialogDescription>
                    </DialogHeader>
                    {isWarmUpLoading && (
                      <div className="space-y-6 py-4">
                          <div className="space-y-2">
                            <Skeleton className="h-5 w-[150px]" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-[90%]" />
                          </div>
                           <Separator/>
                          <div className="space-y-2">
                            <Skeleton className="h-5 w-[200px]" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                      </div>
                    )}
                    {warmUp && (
                      <div className="py-4 space-y-6">
                          <div className="space-y-2">
                              <h4 className="font-semibold flex items-center gap-2"><Info className="text-primary"/> Summary</h4>
                              <p className="text-sm text-muted-foreground">{warmUp.summary}</p>
                          </div>
                          <Separator />
                          <div className="space-y-2">
                              <h4 className="font-semibold flex items-center gap-2"><Sparkles className="text-primary"/> Conversation Starters</h4>
                              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                  {warmUp.conversationStarters.map((starter, i) => <li key={i}>{starter}</li>)}
                              </ul>
                          </div>
                           <Separator />
                           <div className="space-y-2">
                              <h4 className="font-semibold flex items-center gap-2"><Target className="text-primary"/> Key Questions to Ask</h4>
                              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                  {warmUp.keyQuestions.map((q, i) => <li key={i}>{q}</li>)}
                              </ul>
                          </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
