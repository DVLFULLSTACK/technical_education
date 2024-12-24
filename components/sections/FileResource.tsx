"use client"

import Link from "next/link"
import { File, Plus, Minus} from "lucide-react"
import PDFViewer from "./PDFViewer"
import { useState } from "react"
import { Resource } from "@prisma/client"
import { Button } from "../ui/button"
import { Card } from "../ui/card"

export const FileResource = ({resource} : {resource: Resource}) => {
  const [isShow, setIsShow] = useState(false)
  return (
    <div>
        <div className="flex items-center justify-between bg-[#FFF8EB] rounded-lg text-sm font-medium p-3">
            <div className="flex items-center">
            <File className="h-4 w-4 mr-4" />
            <Link
            href={resource.fileUrl}
            target="_blank"
            className="w-max"
          >
            {resource.name}
          </Link>
          </div>
          <div className="" >
            {!isShow ?
              <Button variant={"ghost"} onClick={() => setIsShow(true)}>
            <Plus />
            </Button>
            :
            <Button variant={"ghost"} onClick={() => setIsShow(false)}>
            <Minus />
            </Button>
            }

          </div>
        </div>
          {isShow &&
            <Card className="">
          <PDFViewer pdfUrl={resource.fileUrl}/>
          </Card>
}
          </div>
  )
}
