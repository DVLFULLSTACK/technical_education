import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { title, subtitle, description, levelId, isPublished, categoryId, subCategoryId, price, imageUrl, instructorId } = await req.json()

        const newCourse = await db.course.create({
            data: {
                title,
                subtitle,
                levelId,
                categoryId,
                subCategoryId,
                instructorId: instructorId || userId,
                isPublished,
                price,
                imageUrl,
                description
            }
        })

        return NextResponse.json(newCourse, {status: 200 })
    } catch (err) {
        console.log("[courses_POST]", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET() {
    try {
      // Lấy tất cả các khóa học
      const courses = await db.course.findMany({
        include: {
          category: true,
          subCategory: true,
          level: true,
          sections: true,
        },
      });
      const courseTemp: any[] = courses
      for (let course of courseTemp) {
        const user = await clerkClient.users.getUser(course.instructorId);
        course.instructor = user
      }

      return NextResponse.json({
        data: courseTemp,
        status: "success",
      });
    } catch (error) {
      return NextResponse.json({
        data: null,
        status: "error",
        message: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  }
