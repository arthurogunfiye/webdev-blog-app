'use server';

import db from '@/lib/db';
import { auth } from '@/auth';

export const getBlogById = async ({ blogId }: { blogId: string }) => {
  if (!blogId) return { error: 'No Blog ID. Blog ID is required!' };

  const session = await auth();
  const userId = session?.user.userId;

  try {
    const blog = await db.blog.findUnique({
      where: { id: blogId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        _count: { select: { claps: true, comments: true } },
        claps: {
          where: { userId },
          select: { id: true }
        },
        bookmarks: {
          where: { userId },
          select: { id: true }
        }
      }
    });

    return { success: { blog } };
  } catch (error) {
    return { error: 'Failed to fetch blog by ID!' };
  }
};
