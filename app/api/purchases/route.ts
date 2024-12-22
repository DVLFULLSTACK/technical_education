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

        const { customerId, courseId } = await req.json()
        const purchases = await db.purchase.create({
            data: {
                customerId: customerId || userId,
                courseId
            }
        })

        return NextResponse.json({data: purchases}, {status: 200 })
    } catch (err) {

        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

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
