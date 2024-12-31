"use client";

import React, { useState, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChainTvlData, defiLlama } from "@/services/defillama";
import { cn } from "@/lib/utils";

const chartConfig = {
  tvl: {
    label: "TVL",
    color: "#7c22b2",
  },
} satisfies ChartConfig;

type ChartProps = {
  className?: string;
};

const Chart: React.FC<ChartProps> = ({ className }) => {
  const [data, setData] = useState<ChainTvlData[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await defiLlama.getHistoricalChainTvl();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardDescription className="flex items-center">
          <span>Total Value Locked (TVL) in DeFi</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[200px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value * 1000);
                return date.toLocaleDateString("en-US");
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="tvl"
              fill={`var(--color-tvl)`}
              stroke={`var(--color-tvl)`}
            />
          </AreaChart>
        </ChartContainer>

        {/* <p className="text-xs flex gap-1 ml-auto justify-end px-4 py-2">
          Data source:
          <a
            className="inline underline flex justify-center"
            href="https://defillama.com/"
            target="_blank"
          >
            DefiLlama
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </p> */}
      </CardContent>
    </Card>
  );
};

export default Chart;
