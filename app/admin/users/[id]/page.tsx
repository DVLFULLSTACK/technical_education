import UserForm from "@/components/form/user-form"
import { Card } from "@/components/ui/card"

export const metadata = {
  title: "Chi tiết người dùng"
}

export default function UserDetailPage({params}: {params: {id: string}}) {
  return (
    <div className="py-8 space-y-4">
      <h1 className="font-black text-2xl">Chi tiết người dùng</h1>
    <Card className="p-8">
    <UserForm userId={params.id}/>
    </Card>
    </div>
  )
}
