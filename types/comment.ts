import { z } from "zod"

export const commentSchema = z.object({
  content: z.string().min(1,"Vui lòng nhập bình luận"),
  postId: z.string().optional(),
  authorId: z.string().optional()
})


export type CommentInput = z.infer<typeof commentSchema>
