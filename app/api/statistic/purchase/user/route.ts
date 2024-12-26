import { NextResponse } from "next/server";
import { db } from "@/lib/db";


export async function GET() {
    try {
      const count = await db.purchase.groupBy({
        by: ['customerId'],
        _count: {
          customerId: true,
        },
      });
      const uniqueCustomerCount = count.length;


      return NextResponse.json({
        data:
        uniqueCustomerCount
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
