import { z } from 'zod';

export const EditProfileSchema = z.object({
  name: z
    .string()
    .min(8, { message: 'Name must be 8 characters long or more' })
    .max(30, { message: 'Name must be 30 characters long or less' }),
  email: z.email(),
  bio: z.string().optional(),
  tags: z.array(z.string())
});

export type EditProfileSchemaType = z.infer<typeof EditProfileSchema>;
