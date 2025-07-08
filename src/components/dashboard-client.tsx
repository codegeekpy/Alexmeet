
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { organizerStats } from '@/lib/data';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import type { ChartConfig } from "@/components/ui/chart";

const SessionRatingsChart = dynamic(() => import('@/components/charts').then((mod) => mod.SessionRatingsChart), { ssr: false });
const InterestDistributionChart = dynamic(() => import('@/components/charts').then((mod) => mod.InterestDistributionChart), { ssr: false });

const interestChartConfig = {
    "ai-ml": { label: "AI/ML", color: "hsl(var(--chart-1))" },
    "saas": { label: "SaaS", color: "hsl(var(--chart-2))" },
    "venture-capital": { label: "Venture Capital", color: "hsl(var(--chart-3))" },
    "ux-ui": { label: "UX/UI", color: "hsl(var(--chart-4))" },
    "other": { label: "Other", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

export default function DashboardClient() {
    const [heatmapData, setHeatmapData] = useState<number[]>([]);

    useEffect(() => {
        // Generate random data on the client side to avoid hydration mismatch
        const data = Array.from({ length: 50 }).map(() => Math.random());
        setHeatmapData(data);
    }, []);

    return (
        <div className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Session Ratings</CardTitle>
                        <CardDescription>Average user ratings for top event sessions.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <SessionRatingsChart data={organizerStats.sessionRatings} />
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Interest Distribution</CardTitle>
                        <CardDescription>Breakdown of attendee interests.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <InterestDistributionChart data={organizerStats.interestDistribution} config={interestChartConfig} />
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Engagement Heatmap</CardTitle>
                    <CardDescription>Visual representation of user engagement across the event platform.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-10 gap-2">
                        {heatmapData.length > 0 ? heatmapData.map((engagement, i) => (
                            <div
                                key={i}
                                className="w-full aspect-square rounded-md"
                                style={{ backgroundColor: `hsla(40, 80%, 60%, ${engagement})` }}
                                title={`Engagement: ${(engagement * 100).toFixed(0)}%`}
                                data-ai-hint="heatmap color"
                            />
                        )) : Array.from({ length: 50 }).map((_, i) => (
                            <div key={i} className="w-full aspect-square rounded-md bg-muted animate-pulse" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
