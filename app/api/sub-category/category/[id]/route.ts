import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // Prisma Client
import { SubCategory } from "@prisma/client";

// GET: Lấy tất cả danh mục
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    console.log('TestL ',id)
    const subCategory = await db.subCategory.findMany(
      {
        where: {
          categoryId: id
        }
      }
    );

    return NextResponse.json({data: subCategory}, {status: 200});
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sub categories" }, { status: 500 });
  }
}

// POST: Tạo mới danh mục
