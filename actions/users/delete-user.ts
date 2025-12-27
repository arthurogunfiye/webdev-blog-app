'use server';

import db from '@/lib/db';
import { getUserById } from '@/lib/user';
import { auth } from '@/auth';
import { backendClient } from '@/lib/edgestore-server';

export const deleteUser = async (userId: string) => {
  const user = await getUserById(userId);

  if (!user) return { error: 'User not found!' };

  const session = await auth();

  if (session?.user.userId !== userId)
    return { error: 'You are not authorised to delete this account!' };

  const blogs = await db.blog.findMany({
    where: { userId: user.id }
  });

  // If user has blogs with cover images, delete those images in Edgestore
  if (!!blogs.length) {
    await Promise.all(
      blogs.map(async blog => {
        if (blog.coverImage) {
          try {
            await backendClient.publicFiles.deleteFile({
              url: blog.coverImage
            });
          } catch (error) {
            console.error(`Failed to delete file: ${blog.coverImage}`, error);
          }
        }
      })
    );
  }

  try {
    await db.user.delete({
      where: { id: userId }
    });
  } catch (error) {
    return { error: 'Failed to delete user!' };
  }

  return { success: 'User account deleted successfully!' };
};
