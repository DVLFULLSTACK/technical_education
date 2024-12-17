import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";




export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {
  console.log("params: ",params)
  const id = params.id;

  try {

    const comments = await db.comment.findMany({
      where: { postId: id },
      include: {

      },
    });



    if (!comments) {
      return NextResponse.json({
        data: null,
        status: "error",
        message: "comment not found",
      });
    }
    const commentTemp: any[] = comments
    for (const comment of commentTemp) {
      comment.author = await clerkClient.users.getUser(comment.authorId)
    }

    return NextResponse.json({
      data: commentTemp,
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

