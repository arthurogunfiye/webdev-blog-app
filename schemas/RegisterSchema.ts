import { z } from 'zod';

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: 'Name must be at least 4 characters long' })
      .max(30, { message: 'Name must be at most 30 characters long' }),
    email: z.email(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
