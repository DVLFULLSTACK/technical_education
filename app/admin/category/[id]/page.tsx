import CategoryForm from "@/components/form/category-form"
import { Card } from "@/components/ui/card"

export const metadata = {
  title: "Chi tiết danh mục"
}

export default function UserDetailPage({params}: {params: {id: string}}) {
  return (
    <div className="py-8 space-y-4">
      <h1 className="font-black text-2xl">Chi tiết danh mục</h1>
    <Card className="p-8">
    <CategoryForm categoryId={params.id}/>
    </Card>
    </div>
  )
}
