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

        const { name } = await req.json()

        const newCourse = await db.level.create({
            data: {
                name
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

      const levels = await db.level.findMany({
        include: {

        },
      });


      return NextResponse.json({
        data: levels,
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
