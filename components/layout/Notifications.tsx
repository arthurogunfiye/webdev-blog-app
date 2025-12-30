'use client';

import { getNotifications } from '@/actions/notifications/getNotifications';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Blog, Comment, Notification } from '@prisma/client';
import { Bell } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import moment from 'moment';

export type LatestNotifications = Notification & {
  blog: Pick<Blog, 'id' | 'title'> | null;
  comment: Pick<Comment, 'id' | 'content' | 'blogId'> | null;
};

const Notifications = () => {
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState<LatestNotifications[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getNotifications();
        if (response.success) {
          setNotifications(response.success.notifications);
          setUnreadCount(response.success.unreadNotificationCount);
        }
        if (response.error) {
          setError(response.error);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || 'An error occured');
        }
      } finally {
        setLoading(false);
      }
    };
    handleFetch();
  }, []);

  // useEffect(() => {
  //   const hash = window.location.hash;
  //   let timeoutId: number | undefined;

  //   if (hash) {
  //     timeoutId = window.setTimeout(() => {
  //       const element = document.querySelector(hash);
  //       if (element) {
  //         element.scrollIntoView({ behavior: 'smooth' });
  //       }
  //     }, 0);
  //   }
  //   return () => {
  //     if (timeoutId !== undefined) {
  //       window.clearTimeout(timeoutId);
  //     }
  //   };
  // }, [pathname]);

  // Ensure the bell icon and badge only appear once the client-side session is confirmed
  if (!mounted) return <div className='size-6 mr-2' />; // Empty space to prevent layout jump

  const handleOpen = async (notification: LatestNotifications) => {
    if (notification.entityType === 'BLOG' && notification.blogId) {
      router.push(`/blog/details/${notification.blogId}/#comments`);
    }

    if (notification.entityType === 'COMMENT' && notification.comment?.blogId) {
      router.push(
        `/blog/details/${notification.comment?.blogId}/#${notification.comment.id}`
      );
    }

    if (notification.entityType === 'USER' && notification.senderId) {
      router.push(`/user/${notification.senderId}/1`);
    }

    // TODO: Mark as read
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='relative'>
        <div className={notificationBadgeStyles}>
          <span>{unreadCount}</span>
        </div>
        <Bell size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[100%] max-w-[400px]'>
        <div className='flex gap-4 justify-between mb-2 p-2'>
          <h3 className='font-bold text-lg'>Notifications</h3>
          <button>Mark all as read</button>
        </div>
        {loading && (
          <DropdownMenuItem>
            <div className='text-sm text-gray-500'>Loading...</div>
          </DropdownMenuItem>
        )}
        {error && (
          <DropdownMenuItem>
            <div className='text-sm text-rose-500'>{error}</div>
          </DropdownMenuItem>
        )}
        {!loading &&
          !error &&
          !!notifications.length &&
          notifications.map(notification => {
            return (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  notificationDropdownStyles,
                  !notification.isRead && 'bg-secondary'
                )}
                onClick={() => handleOpen(notification)}
              >
                <div>{notification.content}</div>
                <span className='text-xs'>
                  {moment(new Date(notification.createdAt)).fromNow()}
                </span>
              </DropdownMenuItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;

const notificationBadgeStyles =
  'absolute bg-rose-500 size-6 rounded-full text-sm flex items-center justify-center bottom-2 left-2';
const notificationDropdownStyles =
  'text-sm cursor-pointer mb-4 flex flex-col items-start border';
