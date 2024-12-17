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

        const body = await req.json()

        const newLike = await db.like.create({
            data: {
                ...body
            }
        })

        return NextResponse.json(newLike, {status: 200 })
    } catch (err) {
        console.log("[likes_POST]", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET() {
    try {
      // Lấy tất cả các khóa học
      const likes = await db.like.findMany({
        include: {

        },
      });
      const likesTemp: any[] = likes
      for (let like of likesTemp) {
        const user = await clerkClient.users.getUser(like.authorId)
        like.author = user
      }

      return NextResponse.json({
        data: likesTemp,
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
