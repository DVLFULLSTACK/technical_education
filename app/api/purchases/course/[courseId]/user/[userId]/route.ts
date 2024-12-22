import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // Prisma Client

// GET: Lấy thông tin danh mục theo ID
export async function POST(req: NextRequest, { params }: { params: { courseId: string, userId: string } }) {
  const course_id = params.courseId
  const customer_id = params.userId
  console.log('checfasfsa: ',course_id,customer_id)

  try {
    const purchase = await db.purchase.findFirst({
      where: { courseId: course_id, customerId: customer_id },
    });

    if (!purchase) {
      return NextResponse.json({data: {isRegister:false} }, { status: 200 });
    }

    return NextResponse.json({ data: {isRegister: true}}, {status: 200});
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch purchase" }, { status: 500 });
  }
}

