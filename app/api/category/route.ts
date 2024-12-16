import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // Prisma Client

// GET: Lấy tất cả danh mục
export async function GET() {
  try {
    const categories = await db.category.findMany();

    return NextResponse.json({data: categories}, {status: 200});
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

// POST: Tạo mới danh mục
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const newCategory = await db.category.create({
      data: { name },
    });

    return NextResponse.json({data: newCategory}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
