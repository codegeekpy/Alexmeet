import { VenueClient } from './venue-client';

export default function VenuePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Venue Navigation</h1>
        <p className="text-muted-foreground">
          Find your way around the event with our interactive map.
        </p>
      </div>
      <VenueClient />
    </div>
  );
}
