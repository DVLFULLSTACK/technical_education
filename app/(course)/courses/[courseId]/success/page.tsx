"use client"

import { useUser } from "@clerk/nextjs";
import { Spin } from "@/components/ui/loader";
import purchaseAction from "@/app/actions/purchaseAction";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CoursePaymentSuccess = ({ params }: { params: { courseId: string } }) => {
  const { user} = useUser()
  const router = useRouter()
  const handlePurchase = async () => {
    try {
      await purchaseAction.create({
        customerId: user?.id || "",
        courseId: params.courseId
      })
      router.push(`/courses/${params.courseId}`)
    }
    catch {
      router.push(`/courses/${params.courseId}`)
    }

  }

  useEffect(() => {
    if (user) {
      handlePurchase()
    }
  }, [user])
  return (
    <Spin />
  )
};

export default CoursePaymentSuccess;
