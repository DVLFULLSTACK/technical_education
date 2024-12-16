import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // Prisma Client

// GET: Lấy thông tin danh mục theo ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id



  try {
    const purchase = await db.purchase.findUnique({
      where: { id },
    });

    if (!purchase) {
      return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
    }

    return NextResponse.json({ data: purchase}, {status: 200});
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch purchase" }, { status: 500 });
  }
}

// PUT: Cập nhật danh mục theo ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const body = await req.json();
  const { courseId, customerId } = body;



  try {
    const updatedPurchase = await db.purchase.update({
      where: { id },
      data: { courseId, customerId },
    });

    return NextResponse.json(updatedPurchase);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update purchase" }, { status: 500 });
  }
}

// DELETE: Xóa danh mục theo ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id


  try {
    await db.purchase.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Purchase deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete purchase" }, { status: 500 });
  }
}
