import { Card } from "../ui/card"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function UserCard ({ user} : {user: any}) {

  return (
    <Card className="flex flex-col items-center gap-4 p-4 h-max">
    <div className={cn(
      "px-2  rounded-lg text-white font-semibold",
      user.unsafeMetadata.role==="admin" ? "bg-yellow-400" : user.unsafeMetadata.role==="instructor" ? "bg-green-400" : "bg-blue-400"
      )}>
      {user.unsafeMetadata.role+""}
    </div>
    <Image src={user.imageUrl} width={100} height={100} className="rounded-full" alt=""/>
    <p className="text-sm font-bold">{user.username}</p>
    <p className="text-[.5em] font-thin ">{user.lastName+" "+user.firstName}</p>
  </Card>
  )
}
