import { FollowUpClient } from './follow-up-client';

export default function FollowUpPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Post-Event Follow-Up Assistant</h1>
        <p className="text-muted-foreground">
          Generate personalized follow-up emails for the people you met.
        </p>
      </div>
      <FollowUpClient />
    </div>
  );
}
