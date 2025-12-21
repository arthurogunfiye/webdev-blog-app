'use server';

import db from '@/lib/db';

export const getPublishedBlogs = async ({
  page = 1,
  limit = 3,
  searchObject
}: {
  page: number;
  limit: number;
  searchObject: { tag: string };
}) => {
  const skip = (page - 1) * limit;

  const { tag } = searchObject;

  try {
    const blogs = await db.blog.findMany({
      skip,
      take: limit,
      where: { isPublished: true, ...(tag ? { tags: { has: tag } } : {}) },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      }
    });

    const totalBlogsCount = await db.blog.count({
      where: { isPublished: true }
    });

    const hasMoreBlogs = totalBlogsCount > page * limit;

    return { success: { blogs, hasMoreBlogs } };
  } catch (error) {
    return { error: 'Failed to fetch published blogs.' };
  }
};
