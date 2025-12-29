import { auth } from '@/auth';
import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const session = await auth();
    const userId = session?.user.userId; // Currently logged in user
    const followId = body.followId; // User we want to follow

    if (!userId) {
      return new NextResponse('You are not authorised', { status: 401 });
    }

    if (!followId) {
      return NextResponse.json(
        { error: 'No user to follow ID' },
        { status: 400 }
      );
    }

    if (userId === followId) {
      return NextResponse.json(
        { error: 'You cannot follow yourself!' },
        { status: 400 }
      );
    }

    const isThereAnExistingFollow = await db.follow.findUnique({
      where: {
        followerId_followingId: { followerId: userId, followingId: followId }
      }
    });

    if (isThereAnExistingFollow) {
      //Unfollow
      await db.follow.delete({
        where: {
          followerId_followingId: { followerId: userId, followingId: followId }
        }
      });

      return NextResponse.json({ success: 'unfollowed' });
    } else {
      // Follow
      await db.follow.create({
        data: {
          followerId: userId,
          followingId: followId
        }
      });

      return NextResponse.json({ success: 'followed' });
    }
  } catch (error) {
    console.error('Error at /api/follow POST: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
