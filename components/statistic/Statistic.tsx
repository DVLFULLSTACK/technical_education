"use client"

import { Card } from "../ui/card"
import { StatisticNumber } from "./StatisticNumber"
import { BadgeDollarSign } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import statisticAction from "@/app/actions/statisticAction"
import { Spin } from "../ui/loader"
export const Statistic = () => {

  const {data: statistic, isLoading} = useQuery({
    queryKey: ["statisticOverview"],
    queryFn: statisticAction.getOverviewStatistic,

  })

  if (isLoading) return <Spin />
  return (
    <Card className="p-8 space-y-8">
    <h1 className="font-bold text-gray-600">Thống kê tổng quan</h1>
    <div className="flex justify-around">
      {statistic?.data.map(item => (
        <StatisticNumber value={item.value} name={item.name}/>
      ))}



    </div>
    </Card>
  )
}
