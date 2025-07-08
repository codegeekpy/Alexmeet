import { LiveClient } from './live-client';

export default function LiveInteractionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Live Interactions</h1>
        <p className="text-muted-foreground">
          Engage with sessions through polls, Q&A, and more.
        </p>
      </div>
      <LiveClient />
    </div>
  );
}
