import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";


export async function GET() {
    try {
      let statistic = []

      const courseLength = await db.course.count({
      });
      statistic.push({
        name: "Khóa học",
        value: courseLength
      })
      const totalRevenue = await db.purchase.aggregate({
       _sum: {
        price: true
       }
      }
      )
      statistic.push({
        name: "Doanh thu",
        value: totalRevenue._sum.price + ' $'
      })
      const users = await clerkClient.users.getUserList(); // Lấy danh sách người dùng
      statistic.push({
        name: "Người dùng",
        value: users.totalCount
      })



      return NextResponse.json({
        data:
          statistic
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
