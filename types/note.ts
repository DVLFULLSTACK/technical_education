import { z } from "zod";

export const noteInputSchema = z.object({
  userId: z.string(),
  sectionId: z.string(),
  content: z.string(),
})

export type NoteInput = z.infer<typeof noteInputSchema>
