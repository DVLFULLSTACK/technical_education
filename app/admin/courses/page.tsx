import { CourseTable } from "@/components/table/course-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export const metadata = {
  title: "Quản lý khóa học"
}

export default function CoursesPage () {


  return (
    <div className="py-8 space-y-4">
      <div className="flex flex-row justify-between items-center">
      <h1 className="font-black text-2xl">Quản lý khóa học</h1>
      <Button>
        <Link href="/admin/courses/create" className="flex flex-row items-center justify-center gap-4">
        <Plus />
        Tạo mới
        </Link>
      </Button>
      </div>
    <CourseTable />
    </div>
  )
}
