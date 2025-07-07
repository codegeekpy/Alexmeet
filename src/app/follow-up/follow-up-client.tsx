"use client";

import { postEventFollowUp, PostEventFollowUpOutput } from "@/ai/flows/post-event-follow-up-assistant";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { peopleMet } from "@/lib/data";
import { Loader2, Mail, Send } from "lucide-react";
import { useState } from "react";

export function FollowUpClient() {
  const [emails, setEmails] = useState<PostEventFollowUpOutput['followUpEmails'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateFollowUps = async () => {
    setIsLoading(true);
    setEmails(null);
    try {
      const result = await postEventFollowUp({
        attendeeName: "Alex Doe",
        eventSummary: "RAISE Summit, a conference about AI and technology.",
        peopleMet: peopleMet,
      });
      setEmails(result.followUpEmails);
    } catch (error) {
      console.error("Failed to generate follow-ups:", error);
      toast({
        title: "Error",
        description: "Could not generate follow-ups. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Your Connections</CardTitle>
            <CardDescription>A list of people you connected with at the event.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {peopleMet.map((person, index) => (
              <div key={index} className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{person.name}</p>
                  <p className="text-sm text-muted-foreground">{person.company}</p>
                </div>
              </div>
            ))}
             <Button onClick={handleGenerateFollowUps} disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Generate Follow-ups
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
         <h2 className="text-2xl font-bold tracking-tight mb-4">Generated Drafts</h2>
         {isLoading && (
            <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                     <Card key={i} className="animate-pulse">
                        <CardHeader>
                            <div className="h-5 w-1/2 bg-gray-200 rounded"></div>
                        </CardHeader>
                     </Card>
                ))}
            </div>
         )}
         {!isLoading && emails && (
            <Accordion type="single" collapsible className="w-full">
                {emails.map((email, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="font-semibold">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary" />
                                To: {email.recipientName}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                           <div className="p-4 border bg-secondary rounded-lg space-y-4">
                            <div>
                                <p className="font-semibold text-sm">Subject:</p>
                                <p>{email.subject}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-sm">Body:</p>
                                <p className="whitespace-pre-wrap">{email.body}</p>
                            </div>
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
         )}
         {!isLoading && !emails && (
            <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg">
                <Send className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">Ready to reach out?</h3>
                <p className="text-muted-foreground">Click the "Generate Follow-ups" button to create personalized email drafts.</p>
            </div>
         )}
      </div>
    </div>
  );
}
