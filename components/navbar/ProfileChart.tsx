"use client";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useTranslations } from "next-intl";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  LabelList,
  Cell,
  TooltipProps,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

type QuizResult = { quizId: string; score: number; title: string };

export function ProfileChart({ quizResults }: { quizResults: QuizResult[] }) {
  const t = useTranslations("navbar");
  const chartLabel = t("chartLabel");

  const chartConfig = {
    correct: {
      label: chartLabel,
      color: "",
    },
  };

  const getColorClassForValue = (value: number) => {
    if (value <= 4) return "fill-chart-low";
    if (value <= 14) return "fill-chart-average";
    return "fill-chart-high";
  };

  const data = quizResults.map((item, index) => ({
    ...item,
    index,
  }));

  const CustomTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      const { title, score } = payload[0].payload;
      return (
        <div className="rounded-md border bg-background px-3 py-2 shadow-sm">
          <div className="text-sm font-medium text-foreground">{title}</div>
          <div className="text-xs text-muted-foreground">
            {t("points")}: {score}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-5">
      <h4 className="text-sm font-medium text-muted-foreground">
        {t("chartTitle")}
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
              <Cell
                key={index}
                className={getColorClassForValue(entry.score)}
              />
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
