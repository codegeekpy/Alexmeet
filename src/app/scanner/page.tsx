import { ScannerClient } from './scanner-client';

export default function ScannerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Badge Scanner</h1>
        <p className="text-muted-foreground">
          Scan attendee badges to save their contact information instantly.
        </p>
      </div>
      <ScannerClient />
    </div>
  );
}
