'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

export const deleteComment = async (commentId: string) => {
  const session = await auth();
  const userId = session?.user.userId;

  const comment = await db.comment.findUnique({
    where: { id: commentId }
  });

  if (!comment) return { error: 'Comment not found!' };

  if (comment.userId !== userId)
    return { error: 'You are not authorised to delete this comment!' };

  await db.comment.delete({
    where: { id: comment.id }
  });

  revalidatePath(`/blog/details/${comment.blogId}`);

  return { success: 'Comment deleted successfully!' };
};
