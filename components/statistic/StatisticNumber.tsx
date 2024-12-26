import { ReactNode } from "react"
import { BadgeDollarSign, Book, User } from "lucide-react"
import { cn } from "@/lib/utils"
interface StatisticProps {

  value: number
  name: string
}

export const StatisticNumber = ({ value, name }: StatisticProps) => {
  return (
    <div className="relative cursor-pointer flex items-center justify-center group">
      {/* Vòng tròn */}
      <div
        className={cn(
          "border-[1em] rounded-full size-64 transition-transform duration-500 hover:opacity-100 opacity-80",
          name == "Doanh thu" && "border-green-500",
          name == "Khóa học" && "border-yellow-500",
          name == "Người dùng" && "border-red-500",
        )}
      ></div>

      {/* Nội dung bên trong */}
      <div
        className="absolute flex flex-row items-center gap-2 transition-transform duration-500 group-hover:scale-110"
      >
        {name == "Doanh thu" && (
          <BadgeDollarSign className="size-16 text-green-500" />
        )}
        {name == "Khóa học" && <Book className="size-16 text-yellow-500" />}
        {name == "Người dùng" && <User className="size-16 text-red-500" />}
        <div>
          <h2
            className={cn(
              "font-bold text-2xl",
              name == "Doanh thu" && "text-green-600",
              name == "Khóa học" && "text-yellow-600",
              name == "Người dùng" && "text-red-600"
            )}
          >
            {value}
          </h2>
          <p className="text-gray-600 font-semibold">{name}</p>
        </div>
      </div>
    </div>
  );
};


