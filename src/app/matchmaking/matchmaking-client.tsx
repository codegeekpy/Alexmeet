"use client";

import { generateMatch, MatchmakingEngineOutput } from "@/ai/flows/matchmaking-engine";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { allAttendees } from "@/lib/data";
import { Loader2, Sparkles, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";

export function MatchmakingClient() {
  const [matches, setMatches] = useState<MatchmakingEngineOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

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
  
  const getMatchColor = (percentage: number) => {
    if (percentage > 85) return "bg-green-500";
    if (percentage > 70) return "bg-blue-500";
    return "bg-yellow-500";
  }

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
                  <div className="h-4 w-full bg-gray-200 rounded mt-2"></div>
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
                <div className="flex items-center gap-4">
                   <Avatar className="w-16 h-16 border-2 border-primary/20">
                    <AvatarImage src={`https://placehold.co/100x100.png?text=${match.attendeeName.charAt(0)}`} alt={match.attendeeName} />
                    <AvatarFallback>{match.attendeeName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{match.attendeeName}</CardTitle>
                    <CardDescription>
                      <Badge variant="outline" className="mt-1">
                        <UserCheck className="w-3 h-3 mr-1" />
                        {match.matchPercentage}% Match
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <Progress value={match.matchPercentage} className="h-2" />
                <p className="text-sm text-muted-foreground mt-4 italic">
                  <Sparkles className="inline-block w-4 h-4 mr-2 text-primary" />
                  {match.matchReason}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Connect</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
