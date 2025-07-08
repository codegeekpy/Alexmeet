import { ResourceClient } from './resource-client';

export default function ResourcePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resource Hub</h1>
        <p className="text-muted-foreground">
          Access all event materials in one place.
        </p>
      </div>
      <ResourceClient />
    </div>
  );
}
