import { NextResponse } from "next/server";
import { db } from "@/lib/db";


export async function GET() {
    try {
      const result = await db.purchase.groupBy({
        by: ['courseId'],
        _count: {
          courseId: true,
        },
        orderBy: {
          _count: {
            courseId: 'desc',
          },
        },
        take: 1,
      });
      const response = await db.course.findUnique({
        where: {
          id: result[0].courseId
        }
      })



      return NextResponse.json({
        data:
        response
        ,
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
