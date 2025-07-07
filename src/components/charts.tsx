"use client";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, Pie, ResponsiveContainer, BarChart as BarChartRecharts, PieChart as PieChartRecharts, Cell } from 'recharts';

export function SessionRatingsChart({ data }: { data: any[] }) {
  return (
    <ChartContainer config={{}} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChartRecharts data={data} layout="vertical" margin={{ left: 10, right: 30 }}>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="rating" fill="var(--color-primary)" radius={4} />
        </BarChartRecharts>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
export function InterestDistributionChart({ data }: { data: any[] }) {
  return (
    <ChartContainer config={{}} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChartRecharts>
          <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChartRecharts>
      </ResponsiveContainer>
    </ChartContainer>
  );
}