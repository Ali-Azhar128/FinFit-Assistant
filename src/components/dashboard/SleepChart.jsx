"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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

export const description = "A line chart with dots";

const chartConfig = {
  sleep: {
    label: "Sleep",
    color: "hsl(var(--chart-2))",
  },
};

export function SleepChart({ chartData }) {
  return (
    <Card className="w-[90%]">
      <CardHeader>
        <CardTitle>Sleep Chart</CardTitle>
        <CardDescription>Sleep data for the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
              bottom: 50, // Adjust this value to provide more space at the bottom
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={40}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              padding={{ top: 4 }}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value} hrs`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="hours"
              type="natural"
              stroke="var(--color-sleep)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-sleep)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Sleep increased by 1 hour last night <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing sleep data for the past week
        </div>
      </CardFooter>
    </Card>
  );
}