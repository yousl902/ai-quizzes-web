"use client";

import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { BarChart, Bar, CartesianGrid, XAxis, LabelList, Cell, TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

import siteInfo from "@/siteConfig";

type QuizResult = { quizId: string; score: number; title: string };

export function ProfileChart({ quizResults }: { quizResults: QuizResult[] }) {
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

  // Add index for display
  const data = quizResults.map((item, index) => ({
    ...item,
    index,
  }));

  // Custom tooltip
  const CustomTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      const { title, score } = payload[0].payload;
      return (
        <div className="rounded-md border bg-background px-3 py-2 shadow-sm">
          <div className="text-sm font-medium text-foreground">{title}</div>
          <div className="text-xs text-muted-foreground">Poäng: {score}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-5">
      <h4 className="text-sm font-medium text-muted-foreground">
        Resultat från dina senaste 10 quiz
      </h4>
      <ChartContainer config={chartConfig}>
        <BarChart data={data} margin={{ top: 30 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="index"
            tick={({ x, y, payload }) => (
              <text x={x} y={y + 20} textAnchor="middle">
                {payload.value + 1}
              </text>
            )}
          />
          <ChartTooltip cursor={false} content={<CustomTooltip />} />
          <Bar dataKey="score" radius={8}>
            {data.map((entry, index) => (
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
