import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart, Users, Star } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, Pie, ResponsiveContainer, BarChart as BarChartRecharts, PieChart as PieChartRecharts, Cell } from 'recharts';
import { organizerStats } from '@/lib/data';

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

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Session Ratings</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChartRecharts data={organizerStats.sessionRatings} layout="vertical" margin={{ left: 10, right: 30 }}>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="rating" fill="var(--color-primary)" radius={4} />
                </BarChartRecharts>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Interest Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChartRecharts>
                  <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                  <Pie data={organizerStats.interestDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                     {organizerStats.interestDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                  </Pie>
                </PieChartRecharts>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Engagement Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-10 gap-2">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="w-full aspect-square rounded-md"
                style={{ backgroundColor: `rgba(103, 58, 183, ${Math.random().toFixed(2)})` }}
                title={`Engagement: ${(Math.random() * 100).toFixed(0)}%`}
                data-ai-hint="heatmap color"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
