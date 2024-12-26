"use client"

import { type Note } from "@prisma/client";
import { format} from "date-fns"
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import noteAction from "@/app/actions/noteAction";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Spin } from "../ui/loader";


export function Note ({ note, onDeleteSuccess} : { note: Note, onDeleteSuccess: () => void}) {
  const [isDelete, setIsDelete] = useState(false)
  const handleDeleteNote = async () => {
    setIsDelete(true)
    try {
      await noteAction.delete(note.id)
      toast.success("Xóa thành công")
      onDeleteSuccess()
      // setIsDelete(false)

    } catch (error) {
      toast.error("Yêu cầu thất bại!")
      setIsDelete(false)
    }
  }
  return (
  <div className={cn("space-y-2 text-xs group", isDelete ? "opacity-30" : "")}>
  <div className="flex justify-between items-center">
    <div className="text-gray-500 font-thin">
      {format(note.createdAt, "HH:mm, dd/MM/yyyy")}
    </div>
    {isDelete ?
    <Spin />
    :
      <Button
      variant={"ghost"}
      onClick={handleDeleteNote}
      className="p-0 size-max opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    >
      <Trash2 className="size-1" />
    </Button>}
  </div>

  <div className="py-2 px-4  bg-gray-50 shadow-sm rounded-full cursor-pointer hover:bg-black/80 hover:text-white">
    <p className="break-all">{note.content}</p>
  </div>
</div>

  )
}
