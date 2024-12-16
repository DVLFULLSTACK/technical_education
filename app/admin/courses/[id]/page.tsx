import CourseForm from "@/components/form/course-form"
import { Card } from "@/components/ui/card"

export const metadata = {
  title: "Chi tiết khóa học"
}

export default function UserDetailPage({params}: {params: {id: string}}) {
  return (
    <div className="py-8 space-y-4">
      <h1 className="font-black text-2xl">Chi tiết khóa học</h1>
    <Card className="p-8">
    <CourseForm courseId={params.id}/>
    </Card>
    </div>
  )
}
