"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Sector } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with an active sector";

const chartConfig = {
  calories: {
    label: "Calories",
  },
  food1: {
    label: "Food 1",
    color: "hsl(var(--chart-1))",
  },
  food2: {
    label: "Food 2",
    color: "hsl(var(--chart-2))",
  },
  food3: {
    label: "Food 3",
    color: "hsl(var(--chart-3))",
  },
  food4: {
    label: "Food 4",
    color: "hsl(var(--chart-4))",
  },
  food5: {
    label: "Food 5",
    color: "hsl(var(--chart-5))",
  },
};

export function CaloriesGainedChart({ chartData }) {
  // Ensure each data item has a color
  const dataWithColors = chartData.map((item, index) => ({
    ...item,
    fill: chartConfig[`food${index + 1}`]?.color || chartConfig.calories.color,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Calories Gained</CardTitle>
        <CardDescription>Calories gained from different foods</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={dataWithColors}
              dataKey="calories"
              nameKey="food"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({ outerRadius = 0, ...props }) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total calories gained from different foods
        </div>
      </CardFooter>
    </Card>
  );
}