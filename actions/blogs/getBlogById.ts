'use server';

import db from '@/lib/db';

export const getBlogById = async ({ blogId }: { blogId: string }) => {
  if (!blogId) return { error: 'No Blog ID. Blog ID is required!' };

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
        }
      }
    });

    return { success: { blog } };
  } catch (error) {
    return { error: 'Failed to fetch blog by ID!' };
  }
};
