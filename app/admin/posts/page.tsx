import { PostTable } from "@/components/table/post-table"


export const metadata = {
  title: "Quản lý diễn đàn"
}

export default function ForumPage () {


  return (
    <div className="py-8 space-y-4">
      <div className="flex flex-row justify-between items-center">
      <h1 className="font-black text-2xl">Quản lý diễn đàn</h1>


      </div>
    <PostTable />
    </div>
  )
}
