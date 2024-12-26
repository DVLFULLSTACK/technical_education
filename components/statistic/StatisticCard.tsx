"use client"

import { Card, CardHeader } from "../ui/card"
import Image from "next/image"
import { ChartPie, RefreshCcw, Radio } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import statisticAction from "@/app/actions/statisticAction"

export function StatisticCard () {
  const { data: purchaseCount} = useQuery({
    queryKey: ["getPurchaseCount"],
    queryFn: statisticAction.getPurchaseCount
  })
  const { data: userRegisterCount} = useQuery({
    queryKey: ["getUserRegister"],
    queryFn: statisticAction.getUserRegister
  })
  const { data: course} = useQuery({
    queryKey: ["getCourse"],
    queryFn: statisticAction.getPopularCourse
  })
  return (
    <div
    className="xl:col-span-6 col-span-12"
  >
    <div
      className="grid grid-cols-12 gap-6 h-full"
    >
      <div
        className="md:col-span-4 col-span-12"
      >
        <Card
          className="h-full bg-light-error relative overflow-hidden"
        >
          <CardHeader>
            <Image
              src={"/shape/danger-card-shape.webp"}
              alt="shape"
              width={88}
              height={88}

              className="absolute end-0 top-0"
            />

            <div
              className="w-14 h-10 rounded-full flex items-center justify-center text-white !mb-5 bg-red-300"
            >
              <ChartPie />
            </div>

            <div
              className="flex items-center gap-1"
            >
              <h5
                className="text-xl font-medium"
              >
                {purchaseCount?.data}
              </h5>


            </div>

            <p
              className="text-muted-foreground text-sm mt-2 font-medium"
            >
              Tổng số lượt đăng ký
            </p>
          </CardHeader>
        </Card>
      </div>

      <div
        className="md:col-span-4 col-span-12"
      >
        <Card
          className="h-full bg-light-secondary relative overflow-hidden"
        >
          <CardHeader>
            <Image
              src={"/shape/secondary-card-shape.webp"}
              alt="shape"
              width={88}
              height={88}

              className="absolute end-0 top-0"
            />

            <div
              className="w-14 h-10 rounded-full flex items-center justify-center text-white !mb-5 dark bg-secondary"
            >
              <RefreshCcw />
            </div>

            <div
              className="flex items-center gap-1"
            >
              <h5
                className="text-xl font-medium"
              >
                {userRegisterCount?.data}
              </h5>


            </div>

            <p
              className="text-muted-foreground text-sm mt-2 font-medium"
            >
             Số người đã thanh toán
            </p>
          </CardHeader>
        </Card>
      </div>

      <div
        className="md:col-span-4 col-span-12"
      >
        <Card
          className="h-full bg-light-success relative overflow-hidden"
        >
          <CardHeader>
            <Image
              src={"/shape/success-card-shape.webp"}
              alt="shape"
              width={88}
              height={88}
              className="absolute end-0 top-0"
            />

            <div
              className="w-14 h-10 rounded-full flex items-center justify-center text-white !mb-5 bg-green-300"
            >
              <Radio />
            </div>

            <div
              className="flex items-center gap-1"
            >
              <h5
                className="text-xl font-medium"
              >
                {course?.data.title}
              </h5>


            </div>

            <p
              className="text-muted-foreground text-sm mt-2 font-medium"
            >
              Khóa học phổ biến
            </p>
          </CardHeader>
        </Card>
      </div>
    </div>
  </div>
  )
}
