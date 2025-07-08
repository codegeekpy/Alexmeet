
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { ArrowUp, ThumbsUp, Video, ClipboardCopy } from "lucide-react";

const questions = [
    { id: 1, text: "What's the most surprising application of LPUs you've seen?", votes: 42, userVoted: false },
    { id: 2, text: "How does the performance scale with batch size?", votes: 28, userVoted: true },
    { id: 3, text: "Are there plans for a cloud-based playground for smaller developers?", votes: 15, userVoted: false },
];

export function LiveClient() {
  const { toast } = useToast();

  const handleCopyLink = () => {
    const link = "https://meet.aix.com/j/123-456-789";
    navigator.clipboard.writeText(link);
    toast({
        title: "Link Copied!",
        description: "The meeting link has been copied to your clipboard.",
    });
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Live Poll: Future of AI</CardTitle>
                    <CardDescription>Which AI advancement are you most excited about?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <RadioGroup defaultValue="llm-agents">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="llm-agents" id="r1" />
                            <Label htmlFor="r1">LLM-Powered Agents</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="multimodal" id="r2" />
                            <Label htmlFor="r2">Multimodal AI</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="on-device" id="r3" />
                            <Label htmlFor="r3">On-Device AI</Label>
                        </div>
                    </RadioGroup>
                    <Button className="w-full">Submit Vote</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Instant Meeting</CardTitle>
                    <CardDescription>Start a quick online video call.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full">
                                <Video className="mr-2" />
                                Start Online Meet
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Your meeting is ready!</DialogTitle>
                                <DialogDescription>Share this link with others to have them join your call.</DialogDescription>
                            </DialogHeader>
                            <div className="py-4 space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Input id="meeting-link" defaultValue="https://meet.aix.com/j/123-456-789" readOnly />
                                    <Button onClick={handleCopyLink}>
                                        <ClipboardCopy className="mr-2" />
                                        Copy link
                                    </Button>
                                </div>
                                <p className="text-sm text-muted-foreground">This is a simulated link for demonstration purposes.</p>
                            </div>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Session Q&amp;A</CardTitle>
                    <CardDescription>Ask questions and upvote your favorites.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 mb-6">
                        <Input placeholder="Ask a question..." />
                        <Button>Submit</Button>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold">Top Questions</h4>
                         {questions.map((q) => (
                            <div key={q.id} className="flex items-start justify-between gap-4">
                                <p className="text-sm">{q.text}</p>
                                <Button variant={q.userVoted ? 'default' : 'outline'} size="sm">
                                    <ThumbsUp className="w-4 h-4 mr-2" />
                                    {q.votes}
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Live Quiz</CardTitle>
                    <CardDescription>Test your knowledge from the last session!</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground">The live quiz will begin shortly.</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
