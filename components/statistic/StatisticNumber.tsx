import { ReactNode } from "react"
import { BadgeDollarSign, Book, User } from "lucide-react"
interface StatisticProps {

  value: number
  name: string
}

export const StatisticNumber = ({ value, name} : StatisticProps) => {
  return (
    <div className="flex flex-row  gap-2">
      {name=="Doanh thu" && <BadgeDollarSign  className="size-16 text-green-500"/> }
      {name=="Khóa học" && <Book  className="size-16 text-yellow-500"/> }
      {name=="Người dùng" && <User  className="size-16 text-red-500"/> }
      <div className="">
        <h2 className="font-bold text-2xl">{value}</h2>
        <p className="text-gray-600 font-semibold">{name}</p>
      </div>
    </div>
  )
}
