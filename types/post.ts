import { z } from "zod";
import { numericIdSchema } from "./share";

export const postSchema = z.object({
  content: z.string().min(1, "Vui lòng nhập nội dung"),
  postName: z.string().min(1,"Vui lòng nhập tiêu đề"),
  authorId: z.string().optional(),
})

export type PostInput = z.infer<typeof postSchema>
