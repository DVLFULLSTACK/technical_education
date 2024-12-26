import { NextResponse } from "next/server";
import { db } from "@/lib/db";


export async function GET() {
    try {
      const purchasesCount = await db.purchase.count({})


      return NextResponse.json({
        data:
        purchasesCount
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
