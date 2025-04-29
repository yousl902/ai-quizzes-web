"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, CartesianGrid, XAxis, LabelList, Cell } from "recharts";

import siteInfo from "@/siteConfig";

export function ProfileChart() {
  const { chart } = siteInfo;
  const chartLabel = chart.label;
  const rawData = chart.data;
  const colorScale = chart.colorScale;

  const chartData = rawData.slice(-10).map((val, index) => ({
    id: index + 1,
    correct: val,
  }));

  const chartConfig = {
    correct: {
      label: chartLabel,
      color: "",
    },
  };

  const getColorForValue = (value: number) => {
    for (const rule of colorScale) {
      if (value <= rule.max) return rule.color;
    }
    return "#ccc";
  };

  return (
    <div className="space-y-5">
      <h4 className="text-sm font-medium text-muted-foreground">
        Resultat från dina senaste 10 quiz
      </h4>
      <ChartContainer config={chartConfig}>
        <BarChart data={chartData} margin={{ top: 30 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="id" tick={false} axisLine={false} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="correct" radius={8}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getColorForValue(entry.correct)}
              />
            ))}
            <LabelList
              dataKey="correct"
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
