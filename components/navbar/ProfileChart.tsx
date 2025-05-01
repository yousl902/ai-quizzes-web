"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, CartesianGrid, XAxis, LabelList, Cell } from "recharts";

import siteInfo from "@/siteConfig";

export function ProfileChart({ scores }: { scores: { score: number }[] }) {
  const { chart } = siteInfo;
  const chartLabel = chart.label;
  const colorScale = chart.colorScale;

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
        <BarChart data={scores} margin={{ top: 30 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="index"
            tick={({ x, y, payload }) => {
              return (
                <text x={x} y={y + 20} textAnchor="middle">
                  {payload.index + 1}
                </text>
              );
            }}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="score" radius={8}>
            {scores.map((entry, index) => (
              <Cell key={index} fill={getColorForValue(entry.score)} />
            ))}
            <LabelList
              dataKey="score"
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
