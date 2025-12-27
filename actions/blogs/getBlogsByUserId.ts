'use server';

import db from '@/lib/db';

export const getBlogsByUserId = async ({
  page = 1,
  limit = 3,
  userId
}: {
  page: number;
  limit: number;
  userId: string;
}) => {
  const skip = (page - 1) * limit;

  try {
    const blogs = await db.blog.findMany({
      skip,
      take: limit,
      where: { userId },
      orderBy: { createdAt: 'desc' },
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

    const totalBlogsCount = await db.blog.count({
      where: { userId }
    });

    const hasMoreBlogs = totalBlogsCount > page * limit;

    return { success: { blogs, hasMoreBlogs } };
  } catch (error) {
    return { error: 'Failed to fetch published blogs.' };
  }
};
