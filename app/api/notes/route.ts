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

        const body = await req.json()

        const newNote = await db.note.create({
            data: {
                ...body
            }
        })

        return NextResponse.json(newNote, {status: 200 })
    } catch (err) {
        console.log("[notes_POST]", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET() {
    try {
      // Lấy tất cả các khóa học
      const notes = await db.note.findMany({

      });
      const notesTemp: any[] = notes
      for (let note of notesTemp) {
        const user = await clerkClient.users.getUser(note.authorId)
        note.author = user
      }

      return NextResponse.json({
        data: notesTemp,
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
