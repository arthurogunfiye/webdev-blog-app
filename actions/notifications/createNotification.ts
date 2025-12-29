'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { EntityType, NotificationType } from '@prisma/client';

interface NotificationProps {
  recipientId: string;
  type: NotificationType;
  entityType?: EntityType;
  content?: string;
  blogId?: string;
  commentId?: string;
}

export const createNotification = async ({
  recipientId,
  type,
  entityType,
  content,
  blogId,
  commentId
}: NotificationProps) => {
  const session = await auth();

  if (!session?.user) return { error: 'User is not authenticated!' };

  if (session.user.userId === recipientId)
    return { error: 'You cannot send notification to yourself!' };

  const recipient = await db.user.findUnique({
    where: { id: recipientId }
  });

  if (!recipient) return { error: 'Recipient does not exist!' };

  try {
    await db.notification.create({
      data: {
        senderId: session.user.userId,
        recipientId,
        type,
        blogId: blogId || undefined,
        commentId: commentId || undefined,
        entityType,
        content
      }
    });

    return { success: 'Notification sent successfully!' };
  } catch (error) {
    console.error('Error creating notification: ', error);
    return { error: 'Failed to send notification!' };
  }
};
