import { MatchmakingClient } from './matchmaking-client';

export default function MatchmakingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Matchmaking</h1>
        <p className="text-muted-foreground">
          Discover attendees with shared interests and goals.
        </p>
      </div>
      <MatchmakingClient />
    </div>
  );
}
