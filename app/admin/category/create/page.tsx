import CategoryForm from "@/components/form/category-form"
import { Card } from "@/components/ui/card"
export const metadata = {
  title: "Tạo mới danh mục"
}

export default function CategoryPage () {


  return (
    <div className="py-8 space-y-4">
      <div className="flex flex-row justify-between items-center">
      <h1 className="font-black text-2xl">Tạo mới danh mục</h1>

      </div>
    <Card className="p-8">
    <CategoryForm />
    </Card>
    </div>
  )
}
