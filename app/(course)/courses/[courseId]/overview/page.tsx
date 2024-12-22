import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useSearchParams } from 'next/navigation';

import { db } from "@/lib/db";
import ReadText from "@/components/custom/ReadText";
import SectionMenu from "@/components/layout/SectionMenu";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Level } from "@/components/courses/Level";
import purchaseAction from "@/app/actions/purchaseAction";
import { auth } from "@clerk/nextjs/server";
import toast from "react-hot-toast"
export const metadata = {
  title: "Tổng quan khóa học"
}

const CourseOverview = async ({ params, searchParams }: { params: { courseId: string }, searchParams: { success?:string, cancel?: string} }) => {

  const { userId} = auth()
  if (searchParams && searchParams.success==="true") {
    console.log('Test')
    try {
      await purchaseAction.create({
        customerId: userId || "",
        courseId: params.courseId
      })
      toast.success("Đăng ký học thành công")
    }
    catch {

    }
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      isPublished: true,
    },
    include: {
      sections: {
        where: {
          isPublished: true,
        },
      },
      category: true,
      subCategory: true
    },
  });

  if (!course) {
    return redirect("/");
  }

  const instructor = await clerkClient.users.getUser(course.instructorId);

  let level;

  if (course.levelId) {
    level = await db.level.findUnique({
      where: {
        id: course.levelId,
      },
    });
  }
  console.log('Check: ',course)
  return (
    <div className="grid grid-cols-[3fr_2fr]">
      <div className="px-6 py-4 flex flex-col gap-5 text-sm">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <SectionMenu course={course} />
        </div>

        <p className="font-medium">{course.subtitle}</p>

        <div className="flex gap-2 items-center">
          <Image
            src={
              instructor.imageUrl
                ? instructor.imageUrl
                : "/avatar_placeholder.jpg"
            }
            alt={instructor.fullName ? instructor.fullName : "Instructor photo"}
            width={30}
            height={30}
            className="rounded-full"
          />
          <p className="font-bold">Giảng viên:</p>
          <p>{instructor.fullName}</p>
        </div>

        <div className="flex gap-2">
          <p className="font-bold">Giá:</p>
          <p>${course.price}</p>
        </div>

        <div className="flex gap-2">
          <p className="font-bold">Cấp độ:</p>
          <p>{level?.name}</p>
        </div>
        <div className="flex flex-row gap-2">
          <div className="bg-gray-300 px-2 py-1 rounded-full">{course.category.name}</div>
          <div className="bg-gray-300 px-2 py-1 rounded-full">{course.subCategory.name}</div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold">Mô tả:</p>
          <ReadText value={course.description!} />
        </div>
      </div>
      <div className="p-8 text-center space-y-8">
      <Card className="w-120 h-52 relative rounded-lg overflow-hidden">
        <div className="absolute top-2 right-2 z-10  px-2 py-1">
          <Level levelName={level?.name || ""}/>
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
          <Button>
            ĐĂNG KÝ HỌC
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
