"use client"

import { Card } from "../ui/card"
import { Level } from "./Level"
import Image from "next/image"
import { Button } from "../ui/button"
import { Course } from "@prisma/client"
import axios from "axios"
import toast from "react-hot-toast"
import purchaseAction from "@/app/actions/purchaseAction"
import { useQuery } from "@tanstack/react-query"
import { useUser } from "@clerk/nextjs"

export const CourseRegister = ({levelName, course}: {levelName: string,course: Course}) => {

  const { user, isLoaded} =useUser()
  const { data: checkRegister} = useQuery({
    queryKey: ["checkRegister"],
    queryFn: () => purchaseAction.checkExist({
      courseId: course.id,
      userId: user?.id || ""
    }),
    enabled: isLoaded
  })
  const buyCourse = async () => {
    try {
      const response = await axios.post(`/api/courses/${course.id}/checkout`);
      window.location.assign(response.data.url);
    } catch (err) {
      console.log("Failed to chechout course", err);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau!");
    } finally {
    }
  };
  return (
    <>
    <Card className="w-120 h-52 relative rounded-lg overflow-hidden">
        <div className="absolute top-2 right-2 z-10  px-2 py-1">
          <Level levelName={levelName || ""}/>
        </div>
        <Image
          src={course.imageUrl || ""}
          alt=""
          layout="fill"
          className="rounded-lg object-cover"
        />
      </Card>
        <div className="space-y-4">
          <p className="font-bold text-2xl text-orange-300">{course.price} $</p>
          {!checkRegister?.data.isRegister ?
           <Button onClick={buyCourse}>
            ĐĂNG KÝ HỌC
          </Button>
          :
          <Button className="bg-blue-400">
            HỌC NGAY
          </Button>

          }
        </div>
    </>
  )
}
