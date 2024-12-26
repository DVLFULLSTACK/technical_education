"use client"

import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { Card} from "@/components/ui/card"
import { Button } from "../ui/button";
import Link from "next/link";
import { SectionNote } from "./SectionNote";

export function SectionRightMenu ({section_id} : {section_id: string}) {
  return (

    <Tabs defaultValue="exercise">
      <TabsList>
        <TabsTrigger value="exercise">
        <h1 className="text-2xl font-bold max-md:mb-4">Exercise</h1>
        </TabsTrigger>
        <TabsTrigger value="note">
        <h1 className="text-2xl font-bold max-md:mb-4">Note</h1>

        </TabsTrigger>
      </TabsList>
      <TabsContent value="exercise" className="py-4">

    <div className="text-center space-y-4">
    <p className="text-gray-400 italic">Nhấn vào nút bên dưới để làm bài tập!</p>
    <Button asChild>
      <Link target="_blank"
      href={"https://leetclone.vercel.app/"}>
      Bài tập
      </Link>
    </Button>
    </div>
      </TabsContent>
      <TabsContent value="note" className="py-8">
      <SectionNote section_id={section_id}/>
    </TabsContent>
    </Tabs>




  )
}
