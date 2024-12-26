

export const metadata = {
  title: "Thống kê"
}
import { Statistic } from "@/components/statistic/Statistic"
import { StatisticCard } from "@/components/statistic/StatisticCard"
import { LineChartMultiple } from "@/components/charts/line-chart"

export default function PurchasePage () {


  return (
    <div className="py-8 space-y-4">
      <div className="flex flex-row justify-between items-center">
      <h1 className="font-black text-2xl">Thống kê</h1>


      </div>
      <Statistic />
      <StatisticCard />
    </div>
  )
}
