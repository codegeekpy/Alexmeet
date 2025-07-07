import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { trendingTalks, recommendedForYou } from '@/lib/data';
import { RealTimeAIAssistant } from '@/components/real-time-ai-assistant';
import { Button } from '@/components/ui/button';

export default function DiscoveryPage() {
  return (
    <div className="flex flex-col gap-8">
      <RealTimeAIAssistant />

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
                <Card className="h-full">
                  <CardHeader>
                    <div className="aspect-video relative mb-4">
                      <Image
                        src={talk.image}
                        priority={index === 0}
                        alt={talk.title}
                        fill
                        className="rounded-t-lg object-cover"
                        data-ai-hint={talk.imageHint}
                      />
                    </div>
                    <CardTitle>{talk.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{talk.speaker}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
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
            <Card key={person.name}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16 border-2 border-primary/20">
                    <AvatarImage src={person.avatar} alt={person.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{person.name}</h3>
                    <p className="text-muted-foreground">{person.title}</p>
                    <div className="mt-2">
                      <Progress value={person.match} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-1">{person.match}% Match</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm mt-4 text-muted-foreground">{person.reason}</p>
                 <Button variant="outline" size="sm" className="mt-4 w-full">View Profile</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
