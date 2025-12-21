'use server';

import { BlogSchemaType, BlogSchema } from '@/schemas/BlogSchema';
import { getUserById } from '@/lib/user';
import db from '@/lib/db';

export const editBlog = async (data: BlogSchemaType, blogId: string) => {
  const validatedFields = BlogSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Invalid data provided!' };
  }

  const { userId, isPublished } = validatedFields.data;

  const user = await getUserById(userId);

  if (!user) {
    return { success: false, error: 'User not found!' };
  }

  if (isPublished && !user.emailVerified) {
    return {
      success: false,
      error: 'Please verify your email before publishing a blog.'
    };
  }

  const blog = await db.blog.findUnique({
    where: { id: blogId }
  });

  if (!blog) {
    return { success: false, error: 'Blog not found!' };
  }

  await db.blog.update({
    where: { id: blogId },
    data: { ...validatedFields.data }
  });

  return { success: 'Blog updated successfully!' };
};
