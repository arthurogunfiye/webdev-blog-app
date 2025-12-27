'use client';

import { FaRegBookmark } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '../ui/dropdown-menu';
import { UserRound, User, Pencil, Shield, LogOutIcon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const UserButton = () => {
  const [mounted, setMounted] = useState(false);
  const session = useSession();
  const userId = session?.data?.user.userId;
  const router = useRouter();
  const imageUrl = session.data?.user?.image || '';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering until we are sure we are on the client
  if (!mounted)
    return <div className='size-10 rounded-full bg-muted animate-pulse' />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none'>
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback className={avatarFallbackStyles}>
            <UserRound />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-48'>
        <DropdownMenuItem onClick={() => router.push(`/user/${userId}/1`)}>
          <User size={18} className='mr-2' /> Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/blog/create')}>
          <Pencil size={18} className='mr-2' /> Create Post
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/blog/bookmarks/1')}>
          <FaRegBookmark size={16} className='mr-2' /> Bookmarks
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/admin')}>
          <Shield size={18} className='mr-2' /> Admin
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/login' })}>
          <LogOutIcon size={18} className='mr-2' /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;

const avatarFallbackStyles = 'border-2 border-slate-500 dark:border-slate-50';
