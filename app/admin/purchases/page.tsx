import { PurchaseTable } from "@/components/table/purchase-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export const metadata = {
  title: "Quản lý giao dịch"
}

export default function PurchasePage () {


  return (
    <div className="py-8 space-y-4">
      <div className="flex flex-row justify-between items-center">
      <h1 className="font-black text-2xl">Quản lý giao dịch</h1>


      </div>
    <PurchaseTable />
    </div>
  )
}
