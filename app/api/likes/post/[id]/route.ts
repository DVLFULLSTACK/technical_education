import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";





export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {
  console.log("params: ",params)
  const id = params.id;

  try {

    const like = await db.like.findMany({
      where: { postId: id },
      include: {

      },
    });

    if (!like) {
      return NextResponse.json({
        data: null,
        status: "error",
        message: "Like not found",
      });
    }

    return NextResponse.json({
      data: like,
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

