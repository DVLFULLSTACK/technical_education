import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{ params }: { params: { userId: string } }) {
  console.log("params: ",params)
  const id = params.userId;

  try {

    const post = await db.post.findMany({
      where: { authorId: id },
      include: {

      },
    });

    if (!post) {
      return NextResponse.json({
        data: null,
        status: "error",
        message: "Post not found",
      });
    }

    return NextResponse.json({
      data: post,
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
