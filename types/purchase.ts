import { z } from "zod";
import { Purchase } from "@prisma/client";
import { type User } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
export const purchaseSchema = z.object({
  courseId: z.string().min(1,"Required"),
  customerId: z.string().min(1,"Required"),
})

export type PurchaseFormInputs = z.infer<typeof purchaseSchema>

export type PurchaseCustom = Purchase & {
  customer: User,
  course: Course
};
