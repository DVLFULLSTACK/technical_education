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

        const newPost = await db.post.create({
            data: {
                ...body
            }
        })

        return NextResponse.json(newPost, {status: 200 })
    } catch (err) {
        console.log("[posts_POST]", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET() {
    try {
      // Lấy tất cả các khóa học
      const posts = await db.post.findMany({
        include: {

        },

      });
      const postsTemp: any[] = posts
      for (let post of postsTemp) {
        const user = await clerkClient.users.getUser(post.authorId)
        post.author = user
      }

      return NextResponse.json({
        data: postsTemp,
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
