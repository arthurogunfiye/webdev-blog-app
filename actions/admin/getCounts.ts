'use server';

import db from '@/lib/db';
import { auth } from '@/auth';

export const getCounts = async () => {
  const session = await auth();

  const isThisUserAnAdmin = session?.user.role === 'ADMIN';

  if (!isThisUserAnAdmin)
    return { error: 'Could not fetch counts. User is not an Admin!' };

  try {
    const userCount = await db.user.count();
    const blogCount = await db.blog.count();

    return {
      success: {
        userCount,
        blogCount
      }
    };
  } catch (error) {
    return { error: 'Error fetching counts!' };
  }
};
