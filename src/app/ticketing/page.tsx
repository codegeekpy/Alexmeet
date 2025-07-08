import { TicketingClient } from './ticketing-client';

export default function TicketingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Event Registration</h1>
        <p className="text-muted-foreground">
          Browse through the available sessions and workshops. Select one to begin your registration.
        </p>
      </div>
      <TicketingClient />
    </div>
  );
}
