import { TicketingClient } from './ticketing-client';

export default function TicketingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tickets & Registration</h1>
        <p className="text-muted-foreground">
          Secure your spot at AIxMeet. Choose the pass that's right for you and get a glimpse of our world-class venue.
        </p>
      </div>
      <TicketingClient />
    </div>
  );
}
