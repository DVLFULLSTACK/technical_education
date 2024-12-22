import CourseForm from "@/components/form/course-form"
import { Card } from "@/components/ui/card"

export const metadata = {
  title: "Tạo mới khóa học"
}

export default function UserDetailPage() {
  return (
    <div className="py-8 space-y-4">
      <h1 className="font-black text-2xl">Tạo mới khóa học</h1>
    <Card className="p-8">
    <CourseForm />
    </Card>
    </div>
  )
}
