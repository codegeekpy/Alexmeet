
"use client";

import { generateMatch, MatchmakingEngineOutput } from "@/ai/flows/matchmaking-engine";
import { generateMeetingWarmUp, MeetingWarmUpOutput } from "@/ai/flows/meeting-warm-up-generator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Info, Loader2, MessageCircle, MessageSquareQuote, Sparkles, Target, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";

export function MatchmakingClient() {
  const [matches, setMatches] = useState<MatchmakingEngineOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const [warmUp, setWarmUp] = useState<MeetingWarmUpOutput | null>(null);
  const [isWarmUpLoading, setIsWarmUpLoading] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<MatchmakingEngineOutput[0] | null>(null);
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chattingWith, setChattingWith] = useState<MatchmakingEngineOutput[0] | null>(null);

  useEffect(() => {
    const getMatches = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/attendees');
        if (!response.ok) {
            throw new Error('Failed to fetch attendees');
        }
        const allAttendees = await response.json();
        const otherAttendeeProfiles = allAttendees.filter((p: any) => p.name !== 'Alex Doe');

        const result = await generateMatch({
          attendeeInterests: ['AI', 'SaaS'],
          attendeePersonalityTraits: ['Analytical', 'Collaborative'],
          otherAttendeeProfiles,
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
    setIsWarmUpLoading(true);
    setWarmUp(null);
    try {
      const userProfile = {
        name: "Alex Doe",
        title: "AI Enthusiast",
        company: "AIxMeet Inc.",
        interests: ['AI', 'SaaS'],
        goals: "Find co-founders and learn about scaling AI applications.",
        avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=300&h=300&fit=crop",
      };

      const matchProfile = {
        name: match.attendeeName,
        title: match.title,
        company: match.company,
        interests: match.interests,
        avatar: match.avatar
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

  const handleWarmUpOpen = (match: MatchmakingEngineOutput[0]) => {
    setSelectedMatch(match);
    handleGenerateWarmUp(match);
  };
  
  const handleWarmUpClose = () => {
    setSelectedMatch(null);
    setWarmUp(null);
  }

  const handleChatOpen = (match: MatchmakingEngineOutput[0]) => {
    setChattingWith(match);
    setIsChatOpen(true);
  }

  return (
    <div>
      {isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
             <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-16 h-16 rounded-full"></Skeleton>
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-3/4"></Skeleton>
                      <Skeleton className="h-4 w-1/2"></Skeleton>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-2 w-full mt-2"></Skeleton>
                  <Skeleton className="h-3 w-5/6 mt-4"></Skeleton>
                  <Skeleton className="h-3 w-4/6 mt-2"></Skeleton>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full"></Skeleton>
                </CardFooter>
             </Card>
          ))}
        </div>
      )}
      {!isLoading && matches && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match, index) => (
            <Card key={index} className="flex flex-col transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start gap-4">
                   <Avatar className="w-16 h-16 border-2 border-primary/20">
                    <AvatarImage src={match.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&h=300&fit=crop'} alt={match.attendeeName} />
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
                <p className="text-sm text-muted-foreground italic flex items-start gap-2 bg-secondary/30 p-3 rounded-md">
                   <Sparkles className="inline-block w-4 h-4 mr-1 text-primary flex-shrink-0 mt-0.5" />
                   <span>{match.matchReason}</span>
                </p>
              </CardContent>
              <CardFooter>
                 <div className="w-full flex flex-col sm:flex-row gap-2">
                    <Button className="w-full" onClick={() => handleWarmUpOpen(match)}>
                        <MessageSquareQuote className="mr-2" />
                        Meeting Warm-up
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => handleChatOpen(match)}>
                        <MessageCircle className="mr-2" />
                        Chat
                    </Button>
                 </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedMatch} onOpenChange={(open) => !open && handleWarmUpClose()}>
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
      
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Chat with {chattingWith?.attendeeName}</DialogTitle>
                <DialogDescription>
                    This is a prototype. In a real app, this would be a live chat window.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
                <div className="flex-grow p-4 bg-muted rounded-lg h-64 flex items-center justify-center text-muted-foreground">
                    <p>Chat history would appear here.</p>
                </div>
                <div className="flex gap-2">
                    <Input placeholder="Type a message..." disabled />
                    <Button disabled>Send</Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>
    </div>
  );
}
