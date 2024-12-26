"use client"

import { useQuery } from "@tanstack/react-query"
import noteAction from "@/app/actions/noteAction"
import { Spin } from "../ui/loader"
import { Input } from "@/components/ui/input"
import { SendHorizontal, ZoomIn} from "lucide-react"
import { Button } from "../ui/button"
import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import { Note } from "./Note"
import toast from "react-hot-toast"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
export function SectionNote ({section_id} : {section_id: string}) {
  const { data: notes, isLoading, refetch} = useQuery({
    queryKey: ["getNoteBySection", section_id],
    queryFn: () => noteAction.getBySection(section_id)
  })
  const { user} = useUser()
  const [note,setNote] = useState("")
  const [isSubmitting,setIsSubmitting] = useState(false)
  const handleSendNote = async () => {
    if (note === "") {
      toast.error("Vui lòng nhập ghi chú trước khi nhấn gửi!")
      return
    }
    setIsSubmitting(true)
    try {
      await noteAction.create({
        content: note,
        userId: user?.id || "",
        sectionId: section_id

      })
      refetch()
      setNote("")
      toast.success("Thêm ghi chú thành công")
      setIsSubmitting(false)
    } catch (error) {
      toast.error("Thêm ghi chú thất bại")
      setIsSubmitting(false)
    }
  }
  if (isLoading) return <Spin />
  return (
    <div className="h-full space-y-6">
      <div className="text-right italic font-light">Tổng số ghi chú: {notes?.data.length}</div>
      <div className="space-y-2">
      {
      notes?.data.length >0 &&
      <Dialog>

      <DialogTrigger asChild className="text-right">
        <div className="text-right"><Button variant="outline"><ZoomIn /></Button></div>

      </DialogTrigger>
      <DialogContent className="sm:max-w-[70vw] ">
        <DialogHeader>
          <DialogTitle>Danh sách ghi chú</DialogTitle>
          <DialogDescription>
          Mỗi ghi chú là một bước tiến gần hơn đến thành công! 🚀
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[70vh] overflow-auto">
        {
        notes?.data.length=== 0 ?
        <Image src="/not_found.svg" alt="not_found" width={500} height={500} />
        :
        notes?.data.map(item => (
          <Note onDeleteSuccess={refetch} key={item.id} note={item}/>
        ))
      }
        </div>


      </DialogContent>
    </Dialog>
      }
      <div className="space-y-4 h-[50vh] overflow-auto border rounded-lg p-2">

      {
        notes?.data.length=== 0 ?
        <Image src="/not_found.svg" alt="not_found" width={500} height={500} />
        :
        notes?.data.map(item => (
          <Note onDeleteSuccess={refetch} key={item.id} note={item}/>
        ))
      }
      </div>
      </div>

      <div className="flex items-center">
      <Input placeholder="Nhập ghi chú"
      className="rounded-full"
      value={note}
      onChange={(e) => setNote(e.target.value)}/>
      {isSubmitting ?
      <Spin />
      :
        <Button variant={"ghost"} onClick={() => handleSendNote()}>
      <SendHorizontal />
      </Button>
}
      </div>

    </div>
  )
}
