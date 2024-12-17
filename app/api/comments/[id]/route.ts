import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export const PATCH = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
  try {
    const { userId } = auth();
    const { id } = params;
    const values = await req.json();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const comment = await db.comment.update({
      where: { id: id },
      data: { ...values },
    });

    return NextResponse.json(comment, { status: 200 });
  } catch (err) {
    console.error(["id_PATCH", err]);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
  try {
    const { userId } = auth();
    const { id } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const comment = await db.comment.findUnique({
      where: { id: id, },
      include: {

      }
    });

    if (!comment) {
      return new NextResponse("Comment not found", { status: 404 });
    }



    await db.comment.delete({
      where: { id: id,  },
    });

    return new NextResponse("Comment Deleted", { status: 200 });
  } catch (err) {
    console.error(["id_DELETE", err]);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {
  console.log("params: ",params)
  const id = params.id;

  try {

    const comment = await db.comment.findUnique({
      where: { id },
      include: {

      },
    });

    if (!comment) {
      return NextResponse.json({
        data: null,
        status: "error",
        message: "Comment not found",
      });
    }

    return NextResponse.json({
      data: comment,
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();
  // const { userId } = auth();

  // // Kiểm tra xem người dùng đã đăng nhập hay chưa
  // if (!userId) {
  //   return new NextResponse("Unauthorized", { status: 401 });
  // }

  // Kiểm tra nếu `id` hoặc dữ liệu không hợp lệ
  if (!id || !body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }

  try {
    // Tìm khóa học dựa trên ID và instructorId
    const comment = await db.comment.findUnique({
      where: { id: id },
    });

    if (!comment) {
      return NextResponse.json(
        { error: "Comment not found or unauthorized access" },
        { status: 404 }
      );
    }

    // Cập nhật khóa học
    const updatedComment = await db.comment.update({
      where: { id: id },
      data: { ...body }, // Cập nhật với dữ liệu từ body
    });

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    console.error(["id_PUT", error]);
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 }
    );
  }
}
