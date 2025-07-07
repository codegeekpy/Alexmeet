import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, PieChart, Users, Star } from 'lucide-react';
import { organizerStats } from '@/lib/data';
import DashboardClient from '@/components/dashboard-client';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Organizer Dashboard</h1>
        <p className="text-muted-foreground">
          Live insights and engagement analytics for your event.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{organizerStats.totalAttendees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last event</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{organizerStats.engagementRate}%</div>
            <p className="text-xs text-muted-foreground">+5.2% in the last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Session Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6 / 5.0</div>
            <p className="text-xs text-muted-foreground">Based on {organizerStats.sessionsRated.toLocaleString()} ratings</p>
          </CardContent>
        </Card>
      </div>

      <DashboardClient />
    </div>
  );
}
