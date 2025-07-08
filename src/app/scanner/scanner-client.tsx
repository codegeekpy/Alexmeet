
"use client";

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { QrCode, CameraOff, UserPlus, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

type Attendee = {
    id: number;
    name: string;
    title: string;
    company: string;
    interests: string[];
    personalityTraits: string[];
    avatar: string;
};

export function ScannerClient() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [scannedContacts, setScannedContacts] = useState<Attendee[]>([]);
  const [allAttendees, setAllAttendees] = useState<Attendee[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("Camera API not available.");
        setHasCameraPermission(false);
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", (error as Error).message);
        setHasCameraPermission(false);
      }
    };
    
    const fetchAttendees = async () => {
        try {
            const res = await fetch('/api/attendees');
            if (!res.ok) throw new Error('Failed to fetch attendees');
            const data = await res.json();
            setAllAttendees(data);
        } catch (error) {
            console.error("Error fetching attendees:", error);
            toast({
                title: "Error",
                description: "Could not load attendee data for scanning.",
                variant: "destructive",
            });
        }
    };

    getCameraPermission();
    fetchAttendees();

    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);

  const handleScan = () => {
    if (allAttendees.length === 0) {
        toast({
            variant: "destructive",
            title: "Attendee Data Not Loaded",
            description: "Cannot simulate scan, no attendee data is available.",
        });
        return;
    }

    const randomAttendee = allAttendees[Math.floor(Math.random() * allAttendees.length)];
    
    if (scannedContacts.find(c => c.name === randomAttendee.name)) {
        toast({
            variant: 'default',
            title: "Contact Already Added",
            description: `${randomAttendee.name} is already in your contacts.`,
        });
        return;
    }
    
    setScannedContacts(prev => [randomAttendee, ...prev]);
    toast({
      title: "Contact Added!",
      description: `You've connected with ${randomAttendee.name}.`,
    });
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Badge Scanner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                {hasCameraPermission === false && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
                        <CameraOff className="w-12 h-12 mb-2" />
                        <p className="font-semibold">Camera Access Denied</p>
                        <p className="text-sm">Please enable camera permissions in your browser settings.</p>
                    </div>
                )}
                 {hasCameraPermission === null && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
                        <p>Requesting camera access...</p>
                    </div>
                 )}
            </div>
            <Button onClick={handleScan} disabled={!hasCameraPermission || allAttendees.length === 0} className="w-full mt-4">
              <UserPlus className="mr-2" /> Simulate Scan
            </Button>
            {hasCameraPermission === false && (
                 <Alert variant="destructive" className="mt-4">
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                        Please allow camera access to use this feature. You might need to refresh the page after granting permission.
                    </AlertDescription>
                </Alert>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
         <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Users />
            Saved Contacts
         </h2>
        {scannedContacts.length > 0 ? (
          <div className="space-y-4">
            {scannedContacts.map((contact, index) => (
              <Card key={index}>
                <CardContent className="p-4 flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.title} at {contact.company}</p>
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg bg-muted/50">
            <QrCode className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">No Contacts Yet</h3>
            <p className="text-muted-foreground mt-1">Use the scanner to add new contacts to your list.</p>
          </div>
        )}
      </div>
    </div>
  );
}
