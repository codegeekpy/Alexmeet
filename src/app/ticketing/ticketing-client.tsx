
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, MapPin, Calendar, Clock, Ticket, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { eventSessions } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const ticketTiers = [
  {
    name: 'General Admission',
    price: '$99',
    priceDescription: 'Early Bird Pricing',
    features: ['Access to all main stage talks', 'Entry to the exhibition hall', 'Networking app access', 'Access to resource hub'],
    cta: 'Register Now',
  },
  {
    name: 'VIP Access',
    price: '$299',
    priceDescription: 'Limited Availability',
    features: [
      'All General Admission benefits',
      'Exclusive access to speaker lounge',
      'VIP networking dinner',
      'Priority seating for all sessions',
      'Complimentary swag bag',
    ],
    cta: 'Get VIP Pass',
    isFeatured: true,
  },
  {
    name: 'Student Pass',
    price: '$49',
    priceDescription: 'Requires valid student ID',
    features: ['Access to all main stage talks', 'Entry to the exhibition hall', 'Access to student-focused workshops', 'Career fair access'],
    cta: 'Register as Student',
  },
];

export function EventsClient() {

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  return (
    <div>
      <Dialog>
        <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Available Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventSessions.map((session, index) => (
                <Card key={index} className="flex flex-col">
                    <CardHeader>
                        <CardTitle>{session.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 text-sm pt-2">
                            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(session.startTime).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {formatTime(session.startTime)} - {formatTime(session.endTime)}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground text-sm mb-4">{session.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {session.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <DialogTrigger asChild>
                            <Button className="w-full">
                                <Ticket className="mr-2" />
                                Register
                            </Button>
                        </DialogTrigger>
                    </CardFooter>
                </Card>
            ))}
            </div>
        </div>

        <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
                <DialogTitle className="text-2xl">Register for AIxMeet</DialogTitle>
                <DialogDescription>
                    Choose the pass that's right for you to access this session and more.
                </DialogDescription>
            </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start py-6">
                {ticketTiers.map((tier) => (
                <Card key={tier.name} className={cn("flex flex-col h-full", tier.isFeatured && "border-primary shadow-lg relative")}>
                    {tier.isFeatured && (
                    <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                        <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Most Popular
                        </div>
                    </div>
                    )}
                    <CardHeader>
                    <CardTitle>{tier.name}</CardTitle>
                    <div className="flex items-baseline gap-2 pt-2">
                        <span className="text-4xl font-bold">{tier.price}</span>
                        <span className="text-muted-foreground">{tier.priceDescription}</span>
                    </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                    <ul className="space-y-3">
                        {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                            <span className="text-muted-foreground">{feature}</span>
                        </li>
                        ))}
                    </ul>
                    </CardContent>
                    <CardFooter>
                    <Button className="w-full" variant={tier.isFeatured ? 'default' : 'outline'}>
                        {tier.cta}
                    </Button>
                    </CardFooter>
                </Card>
                ))}
            </div>
        </DialogContent>
      </Dialog>
      
      <Separator className="my-12" />

      <div className="space-y-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Our World-Class Venue</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
            Our event is hosted at the prestigious Grand Tech Arena, featuring state-of-the-art facilities perfect for learning and networking.
        </p>
        <Card className="max-w-4xl mx-auto">
            <CardContent className="p-2 aspect-video relative">
                <Image src="https://placehold.co/1200x800.png" alt="Venue Map Preview" data-ai-hint="venue map" fill className="rounded-md object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 right-4">
                    <Link href="/venue">
                        <Button>
                            <MapPin className="mr-2" />
                            Explore Interactive Map
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
      </div>

      <Separator className="my-12" />

      <div className="space-y-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Post-Event Follow-Up</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
            The event may be over, but the connections you made are just beginning. Generate personalized follow-up emails to the people you met.
        </p>
        <Link href="/follow-up">
            <Button>
                <Send className="mr-2" />
                Go to Follow-Up Assistant
            </Button>
        </Link>
      </div>
    </div>
  );
}
