"use client";

import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, Pie, BarChart as BarChartRecharts, PieChart as PieChartRecharts, Cell, ResponsiveContainer } from "recharts";

const THEME_CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function SessionRatingsChart({ data }: { data: any[] }) {
  return (
    <ChartContainer config={{}} className="h-[300px] w-full">
      <BarChartRecharts data={data} layout="vertical" margin={{ left: 10, right: 30 }}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="rating" radius={4}>
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={THEME_CHART_COLORS[index % THEME_CHART_COLORS.length]} />
            ))}
          </Bar>
      </BarChartRecharts>
    </ChartContainer>
  );
}
export function InterestDistributionChart({ data }: { data: any[] }) {
  return (
    <ChartContainer config={{}} className="h-[300px] w-full">
        <PieChartRecharts width={400} height={300}>
          <ChartLegend content={<ChartLegendContent nameKey="name" />} />
          <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChartRecharts>
    </ChartContainer>
  );
}
