
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { trendingTalks, recommendedForYou } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { UserCheck } from 'lucide-react';
import { LeaderboardClient } from '@/app/leaderboard/leaderboard-client';
import { FloatingAIAssistant } from '@/components/floating-ai-assistant';

export default function DiscoveryPage() {
  return (
    <div className="flex flex-col gap-8">
      <FloatingAIAssistant />

      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Trending Talks</h2>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent>
            {trendingTalks.map((talk: any, index: number) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardHeader className="p-0">
                    <div className="aspect-video relative mb-4">
                      <Image
                        src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&h=400&fit=crop"
                        priority={index === 0 ? true : false}
                        alt={talk.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="rounded-t-lg object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{talk.title}</CardTitle>
                    <p className="text-sm text-muted-foreground pt-1">{talk.speaker}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {talk.tags.map((tag: any) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Recommended For You</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendedForYou.map((person) => (
            <Card key={person.name} className="transition-shadow hover:shadow-lg flex flex-col">
               <CardHeader>
                 <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16 border-2 border-primary/20">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{person.name}</CardTitle>
                    <CardDescription>{person.title}</CardDescription>
                     <Badge variant="outline" className="mt-2">
                        <UserCheck className="w-3 h-3 mr-1" />
                        {person.match}% Match
                      </Badge>
                  </div>
                </div>
               </CardHeader>
              <CardContent className="flex-grow">
                <Progress value={person.match} className="h-2 my-2" />
                <p className="text-sm mt-2 text-muted-foreground">{person.reason}</p>
              </CardContent>
              <CardFooter>
                 <Button variant="outline" size="sm" className="w-full">View Profile</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Event Leaderboard</h2>
          <p className="text-muted-foreground">
            See who's making the most connections and attending the most sessions.
          </p>
        </div>
        <LeaderboardClient />
      </section>
    </div>
  );
}
