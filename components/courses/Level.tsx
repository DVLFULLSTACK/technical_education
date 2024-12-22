import { db } from "@/lib/db";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export const  Level =  ({levelName}: {levelName : string}) => {




  if (!levelName) return <Skeleton className="w-12 h-6 bg-gray-300 rounded-sm"/>
  return (
    <div className={
      cn("p-2 text-white rounded-full",
        levelName === "Beginner" ? "bg-white text-black" : "",
        levelName === "Intermediate" ? "bg-yellow-400/80" : "",
        levelName === "Expert" ? "bg-red-500/80" : "",
        levelName === "All levels" ? "bg-blue-400" : ""
      )
    }>{levelName}</div>
  )
}
