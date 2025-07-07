import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileForm } from './profile-form';

export default function ProfilePage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-24 h-24 text-lg">
          <AvatarImage src="https://placehold.co/100x100.png" alt="User profile" data-ai-hint="person portrait" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
            <p className="text-muted-foreground">
              This information helps us personalize your event experience.
            </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Tell us about your interests and goals for this event.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
