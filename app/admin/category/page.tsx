import { CategoryTable } from "@/components/table/category-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export const metadata = {
  title: "Quản lý danh mục"
}

export default function CategoryPage () {


  return (
    <div className="py-8 space-y-4">
      <div className="flex flex-row justify-between items-center">
      <h1 className="font-black text-2xl">Quản lý danh mục</h1>
      <Button>
        <Link href="/admin/category/create" className="flex flex-row items-center justify-center gap-4">
        <Plus />
        Tạo mới
        </Link>
      </Button>
      </div>
    <CategoryTable />
    </div>
  )
}
