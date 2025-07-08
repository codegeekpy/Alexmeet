import { EventsClient } from './ticketing-client';

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
        <p className="text-muted-foreground">
          Browse through the available sessions and workshops. Select one to begin your registration.
        </p>
      </div>
      <EventsClient />
    </div>
  );
}
