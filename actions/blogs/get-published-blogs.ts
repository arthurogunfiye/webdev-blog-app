'use server';

import db from '@/lib/db';
import { auth } from '@/auth';

export const getPublishedBlogs = async ({
  page = 1,
  limit = 3,
  searchObject
}: {
  page: number;
  limit: number;
  searchObject: { tag: string; title: string };
}) => {
  const skip = (page - 1) * limit;

  const { tag, title } = searchObject;

  const session = await auth();
  const userId = session?.user.userId;

  try {
    const blogs = await db.blog.findMany({
      skip,
      take: limit,
      where: {
        title: { contains: title, mode: 'insensitive' },
        isPublished: true,
        ...(tag ? { tags: { has: tag } } : {})
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        _count: { select: { claps: true } },
        claps: {
          where: { userId },
          select: { id: true }
        }
      }
    });

    const totalBlogsCount = await db.blog.count({
      where: {
        title: { contains: title, mode: 'insensitive' },
        isPublished: true,
        ...(tag ? { tags: { has: tag } } : {})
      }
    });

    const hasMoreBlogs = totalBlogsCount > page * limit;

    return { success: { blogs, hasMoreBlogs } };
  } catch (error) {
    return { error: 'Failed to fetch published blogs.' };
  }
};
