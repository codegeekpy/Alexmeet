import { AgendaClient } from './agenda-client';

export default function AgendaPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Personalized Agenda</h1>
        <p className="text-muted-foreground">
          Let our AI build the perfect event schedule for you.
        </p>
      </div>
      <AgendaClient />
    </div>
  );
}
