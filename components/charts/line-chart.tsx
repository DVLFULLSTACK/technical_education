"use client"

import {
  CircleDollarSign,
  ListTodo,
} from "lucide-react"
import {
  CartesianGrid, Line, LineChart, XAxis,
} from "recharts"

import {
  Button,
} from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"

export const description = "A multiple line chart"

const chart = [
  {
    month: "January",
    desktop: 186,
    mobile: 80,
  },
  {
    month: "February",
    desktop: 305,
    mobile: 200,
  },
  {
    month: "March",
    desktop: 237,
    mobile: 120,
  },
  {
    month: "April",
    desktop: 73,
    mobile: 190,
  },
  {
    month: "May",
    desktop: 209,
    mobile: 130,
  },
  {
    month: "June",
    desktop: 214,
    mobile: 140,
  },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function LineChartMultiple() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Số đơn hàng & Doanh thu</CardTitle>

        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
        >
          <LineChart
            accessibilityLayer
            data={chart}
            margin={
              {
                left: 12,
                right: 12,
              }
            }
          >
            <CartesianGrid
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={
                value =>
                  value.slice(
                    0, 3
                  )
              }
            />

            <ChartTooltip
              cursor={false}
              // content={<ChartTooltipContent />}
            />

            <Line
              dataKey="desktop"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />

            <Line
              dataKey="mobile"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <div
          className="flex-col xl:flex-row flex w-full xl:items-center gap-4 text-sm justify-between"
        >
          <div
            className="sm:flex gap-7 items-center sm:space-y-0 space-y-3"
          >
            <div
              className="flex gap-2 items-center"
            >
              <div
                className="w-14 h-10 rounded-full flex items-center justify-center text-chart-1 bg-chart-1/15"
              >
                <ListTodo
                  className="size-5"
                />
              </div>

              <div>
                <h6
                  className="text-base"
                >
                  <span
                    className="font-semibold"
                  >
                    63,489
                  </span>

                  {" "}

                  <span
                    className="bg-light-success dark:bg-light-primary rounded-full text-success text-xs py-[5px] px-[10px]"
                  >
                    +8%
                  </span>
                </h6>

                <p
                  className="text-darklink text-sm text-muted-foreground"
                >
                  Profit this year
                </p>
              </div>
            </div>

            <div
              className="flex gap-2 items-center"
            >
              <div
                className="w-14 h-10 rounded-full flex items-center justify-center text-chart-5 bg-chart-5/15"
              >
                <CircleDollarSign
                  className="size-5"
                />
              </div>

              <div>
                <h6
                  className="text-base"
                >
                  <span
                    className="font-semibold"
                  >
                    $38,496.00
                  </span>
                </h6>

                <p
                  className="text-darklink text-sm text-muted-foreground"
                >
                  Profit this year
                </p>
              </div>
            </div>
          </div>

          <Button>Xem chi tiết</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
