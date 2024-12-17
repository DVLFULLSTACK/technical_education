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

        const newComment = await db.comment.create({
            data: {
                ...body
            }
        })

        return NextResponse.json(newComment, {status: 200 })
    } catch (err) {
        console.log("[comments_POST]", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET() {
    try {
      // Lấy tất cả các khóa học
      const comments = await db.comment.findMany({
        include: {

        },
      });
      const commentsTemp: any[] = comments
      for (let comment of commentsTemp) {
        const user = await clerkClient.users.getUser(comment.authorId)
        comment.author = user
      }

      return NextResponse.json({
        data: commentsTemp,
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
