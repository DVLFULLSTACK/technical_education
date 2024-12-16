import PurchaseForm from "@/components/form/purchase-form"
import { Card } from "@/components/ui/card"

export const metadata = {
  title: "Chi tiết giao dịch"
}

export default function UserDetailPage({params}: {params: {id: string}}) {
  return (
    <div className="py-8 space-y-4">
      <h1 className="font-black text-2xl">Chi tiết giao dịch</h1>
    <Card className="p-8">
    <PurchaseForm purchaseId={params.id}/>
    </Card>
    </div>
  )
}
