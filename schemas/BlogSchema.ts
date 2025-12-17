import { z } from 'zod';

export const BlogSchema = z.object({
  userId: z.string(),
  title: z
    .string()
    .min(10, 'Title is required and must be at least 10 characters long')
    .max(150, 'Title must be at most 150 characters long'),
  content: z
    .string()
    .min(10, 'Content is required and must be at least 10 characters long')
    .max(5000, 'Content must be at most 5000 characters long'),
  coverImage: z.string().optional(),
  isPublished: z.boolean(),
  tags: z.array(z.string())
});

export type BlogSchemaType = z.infer<typeof BlogSchema>;
