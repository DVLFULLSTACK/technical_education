import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export const PATCH = async (
    req: NextRequest,
    { params }: { params: { courseId: string } }
) => {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const course = await db.course.update({
      where: { id: courseId, instructorId: userId },
      data: { ...values },
    });

    return NextResponse.json(course, { status: 200 });
  } catch (err) {
    console.error(["courseId_PATCH", err]);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { courseId: string } }
) => {
  try {
    const { userId } = auth();
    const { courseId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: { id: courseId},
      include: {
        sections: {
          include: {
            muxData: true,
          }
        }
      }
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    for (const section of course.sections) {
      if (section.muxData?.assetId) {
        await video.assets.delete(section.muxData.assetId);
      }
    }

    await db.course.delete({
      where: { id: courseId},
    });

    return new NextResponse("Course Deleted", { status: 200 });
  } catch (err) {
    console.error(["courseId_DELETE", err]);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export async function GET(req: NextRequest,{ params }: { params: { courseId: string } }) {
  console.log("params: ",params)
  const id = params.courseId;

  try {
    // Lấy khóa học theo ID
    const course = await db.course.findUnique({
      where: { id },
      include: {
        category: true,
        subCategory: true,
        level: true,
        sections: true,
      },
    });

    if (!course) {
      return NextResponse.json({
        data: null,
        status: "error",
        message: "Course not found",
      });
    }

    return NextResponse.json({
      data: course,
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
  { params }: { params: { courseId: string } }
) {
  const { courseId } = params;
  const body = await req.json();
  // const { userId } = auth();

  // // Kiểm tra xem người dùng đã đăng nhập hay chưa
  // if (!userId) {
  //   return new NextResponse("Unauthorized", { status: 401 });
  // }

  // Kiểm tra nếu `courseId` hoặc dữ liệu không hợp lệ
  if (!courseId || !body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }

  try {
    // Tìm khóa học dựa trên ID và instructorId
    const course = await db.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found or unauthorized access" },
        { status: 404 }
      );
    }

    // Cập nhật khóa học
    const updatedCourse = await db.course.update({
      where: { id: courseId },
      data: { ...body }, // Cập nhật với dữ liệu từ body
    });

    return NextResponse.json(updatedCourse, { status: 200 });
  } catch (error) {
    console.error(["courseId_PUT", error]);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}
