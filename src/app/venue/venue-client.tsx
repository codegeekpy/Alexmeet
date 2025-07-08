"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Building, Coffee, MapPin, Mic, Presentation, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";

const locations = [
    { name: 'Main Stage', icon: Presentation, type: 'Stage' },
    { name: 'Developer Zone', icon: Mic, type: 'Track' },
    { name: 'Startup Alley', icon: Building, type: 'Area' },
    { name: 'Innovate Inc. Booth', icon: MapPin, type: 'Booth' },
    { name: 'Creative Solutions Booth', icon: MapPin, type: 'Booth' },
    { name: 'Coffee Station', icon: Coffee, type: 'Amenity' },
    { name: 'Networking Lounge', icon: Users, type: 'Amenity' },
];

function Users(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}


export function VenueClient() {
    return (
        <div className="grid lg:grid-cols-4 gap-8 h-[75vh]">
            <Card className="lg:col-span-1 flex flex-col">
                <CardHeader>
                    <CardTitle>Key Locations</CardTitle>
                    <CardDescription>Select a location to highlight it on the map.</CardDescription>
                </CardHeader>
                <ScrollArea className="flex-grow">
                    <CardContent>
                        <div className="space-y-4">
                            {locations.map((loc, index) => (
                                <div key={index}>
                                    <Button variant="ghost" className="w-full justify-start h-auto py-2">
                                        <loc.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-semibold text-left">{loc.name}</p>
                                            <p className="text-xs text-muted-foreground text-left">{loc.type}</p>
                                        </div>
                                    </Button>
                                    {index < locations.length - 1 && <Separator className="mt-2" />}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </ScrollArea>
            </Card>

            <Card className="lg:col-span-3 relative overflow-hidden">
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <Button size="icon"><ZoomIn /></Button>
                    <Button size="icon"><ZoomOut /></Button>
                </div>
                <Image
                    src="https://placehold.co/1200x800.png"
                    alt="Venue Map"
                    fill
                    className="object-cover"
                    data-ai-hint="venue map"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </Card>
        </div>
    );
}
