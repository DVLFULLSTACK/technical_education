import { UsersTable } from "@/components/table/user-table"

export const metadata = {
  title: "Quản lý user"
}

export default function UsersPage () {


  return (
    <div className="py-8 space-y-4">
      <h1 className="font-black text-2xl">Quản lý người dùng</h1>
    <UsersTable />
    </div>
  )
}
