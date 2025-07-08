import { LeaderboardClient } from './leaderboard-client';

export default function LeaderboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Event Leaderboard</h1>
        <p className="text-muted-foreground">
          See who's making the most connections and attending the most sessions.
        </p>
      </div>
      <LeaderboardClient />
    </div>
  );
}
