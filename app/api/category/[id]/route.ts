import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // Prisma Client

// GET: Lấy thông tin danh mục theo ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id



  try {
    const category = await db.category.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ data: category}, {status: 200});
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
  }
}

// PUT: Cập nhật danh mục theo ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const body = await req.json();
  const { name } = body;



  try {
    const updatedCategory = await db.category.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

// DELETE: Xóa danh mục theo ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id


  try {
    await db.category.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
