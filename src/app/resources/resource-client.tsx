
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trendingTalks } from "@/lib/data";
import { Download, Globe } from "lucide-react";
import { useEffect, useState } from "react";

export function ResourceClient() {
  const [speakers, setSpeakers] = useState<any[]>([]);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await fetch('/api/attendees');
        if (!res.ok) {
          throw new Error('Failed to fetch speakers');
        }
        const data = await res.json();
        setSpeakers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSpeakers();
  }, []);

  return (
     <Tabs defaultValue="slides" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="slides">Presentation Slides</TabsTrigger>
        <TabsTrigger value="speakers">Speaker Bios</TabsTrigger>
        <TabsTrigger value="sponsors">Sponsor Materials</TabsTrigger>
      </TabsList>

      <TabsContent value="slides" className="mt-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trendingTalks.map((talk, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle>{talk.title}</CardTitle>
                        <CardDescription>{talk.speaker}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button variant="outline" className="w-full">
                            <Download className="mr-2"/>
                            Download PDF
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </TabsContent>

      <TabsContent value="speakers" className="mt-6">
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {speakers.map((speaker, index) => (
                <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                        <Avatar className="w-20 h-20 mx-auto mb-4">
                            <AvatarImage src={speaker.avatar} alt={speaker.name} />
                            <AvatarFallback>{speaker.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-semibold">{speaker.name}</h3>
                        <p className="text-sm text-muted-foreground">{speaker.title} at {speaker.company}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </TabsContent>

      <TabsContent value="sponsors" className="mt-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[{name: 'Innovate Inc.'}, {name: 'Creative Solutions'}, {name: 'BigData Corp'}, {name: 'ScaleFast'}].map((sponsor, index) => (
                <Card key={index}>
                    <CardContent className="pt-6 flex flex-col items-center justify-center text-center">
                         <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                             <Globe className="w-10 h-10 text-muted-foreground" />
                         </div>
                        <h3 className="text-lg font-semibold">{sponsor.name}</h3>
                        <p className="text-sm text-muted-foreground">Gold Sponsor</p>
                    </CardContent>
                     <CardFooter>
                        <Button variant="secondary" size="sm" className="w-full">Visit Website</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
