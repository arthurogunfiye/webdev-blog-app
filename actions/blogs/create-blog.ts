'use server';

import { BlogSchema, BlogSchemaType } from '@/schemas/BlogSchema';
import { getUserById } from '@/lib/user';
import db from '@/lib/db';

export const createBlog = async (values: BlogSchemaType) => {
  const validatedFields = BlogSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid blog fields!' };
  }

  const { userId, isPublished } = validatedFields.data;

  const user = await getUserById(userId);

  if (!user) {
    return { error: 'User not found!' };
  }

  if (isPublished && !user.emailVerified) {
    return {
      error: 'Please verify your email before publishing a blog.'
    };
  }

  await db.blog.create({
    data: { ...validatedFields.data }
  });

  if (isPublished) {
    return { success: 'Blog published successfully!' };
  }

  return { success: 'Blog saved as draft successfully!' };
};
