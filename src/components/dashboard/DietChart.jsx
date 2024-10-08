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

export const description = "A line chart showing eating times";



const chartConfig = {
  ate: {
    label: "Ate",
    color: "hsl(var(--chart-1))",
  },
};

export function DietChart({chartData}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Eating Times Chart</CardTitle>
        <CardDescription>Eating patterns throughout the day</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis
            padding={{ top: 4 }}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              ticks={[0, 1]}
              domain={[0, 1]}
              tickFormatter={(value) => (value === 1 ? "Ate" : "Not Ate")}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="ate"
              type="stepAfter"
              stroke="var(--color-ate)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-ate)",
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
          Eating pattern analysis <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing eating times for the day
        </div>
      </CardFooter>
    </Card>
  );
}