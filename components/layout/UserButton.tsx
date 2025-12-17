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

const UserButton = () => {
  const session = useSession();
  const imageUrl = session.data?.user?.image || '';
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback className={avatarFallbackStyles}>
            <UserRound />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button className={buttonStyles}>
            <User size={18} /> Profile
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            className={buttonStyles}
            onClick={() => router.push('/blog/create')}
          >
            <Pencil size={18} /> Create Post
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className={buttonStyles}>
            <FaRegBookmark size={16} /> Bookmark
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className={buttonStyles}>
            <Shield size={18} /> Admin
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className={buttonStyles} onClick={() => signOut()}>
            <LogOutIcon size={18} /> Sign Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;

const avatarFallbackStyles = 'border-2 border-slate-500 dark:border-slate-50';
const buttonStyles = 'flex items-center gap-2';
