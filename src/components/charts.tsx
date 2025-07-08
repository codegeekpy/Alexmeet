"use client";

import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import * as React from "react";
import { Bar, Pie, BarChart as BarChartRecharts, PieChart as PieChartRecharts, Cell, ResponsiveContainer, Label } from "recharts";

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

export function InterestDistributionChart({ data, config }: { data: any[], config: any }) {
  const totalValue = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.value, 0);
  }, [data]);

  return (
    <ChartContainer
      config={config}
      className="mx-auto aspect-square h-[300px]"
    >
      <PieChartRecharts>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="name" />}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={`var(--color-${entry.name.toLowerCase().replace(/[\s/]/g, '-')})`}
            />
          ))}
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalValue.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Attendees
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="name" />}
          className="-translate-y-[2rem] flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChartRecharts>
    </ChartContainer>
  );
}
