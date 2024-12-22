import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";



export const POST = async (req: NextRequest) => {
  try {
    console.log('testasfsafas')
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const { customerId, courseId } = await req.json();

    // Kiểm tra xem bản ghi đã tồn tại chưa
    const existingPurchase = await db.purchase.findFirst({
      where: {
        customerId: customerId,
        courseId: courseId,
      },
    });

    // Nếu đã tồn tại, không tạo mới và trả về thông báo
    if (existingPurchase) {
      return new NextResponse("Purchase already exists", { status: 400 });
    }

    // Nếu không tồn tại, tạo bản ghi mới
    const purchase = await db.purchase.create({
      data: {
        customerId: customerId,
        courseId,
      },
    });

    return NextResponse.json({ data: purchase }, { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export async function GET() {
    try {


      const purchases = await db.purchase.findMany({
        include: {
          course: true,

        },
      });

      const purchaseTemp: any[] = purchases
      for (let purchase of purchaseTemp) {
        const user = await clerkClient.users.getUser(purchase.customerId);
        purchase.customer = user
      }
      return NextResponse.json({
        data: purchaseTemp,
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
