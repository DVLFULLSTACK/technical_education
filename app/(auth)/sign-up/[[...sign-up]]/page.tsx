"use client"

import { SignUp } from "@clerk/nextjs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label} from "@/components/ui/label"
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function Page() {
  const [role,setRole] = useState("student")
  return (
  <div className="flex flex-col h-[80vh] overflow-auto px-12 space-y-4">
    <Card className="p-4 ">
    <RadioGroup defaultValue="student" className="flex flex-row gap-4 justify-center" onValueChange={(value) => setRole(value)}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="student" id="student" />
    <Label htmlFor="student">Student</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="instructor" id="instructor" />
    <Label htmlFor="instructor">Instructor</Label>
  </div>
</RadioGroup>

    </Card>
    <SignUp unsafeMetadata={{role : role}} />
  </div>
)
}
