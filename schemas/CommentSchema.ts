import { z } from 'zod';

export const CommentSchema = z.object({
  content: z
    .string()
    .min(10, { message: 'Your comment is too short, min 10 characters' })
    .max(500, { message: 'Your comment is too long, max 500 characters' })
});

export type CommentSchemaType = z.infer<typeof CommentSchema>;
