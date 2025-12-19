import { User } from '@prisma/client';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { UserRound } from 'lucide-react';
import moment from 'moment';

export interface UserSummaryProps {
  user: Pick<User, 'id' | 'name' | 'image'>;
  createdDate?: Date | null;
}

const UserSummary = ({ user, createdDate }: UserSummaryProps) => {
  return (
    <Link href={`/user/${user.id}/1`} className={linkStyles}>
      <Avatar className='size-6'>
        <AvatarImage src={user?.image || ''} />
        <AvatarFallback className={avatarFallbackStyles}>
          <UserRound />
        </AvatarFallback>
      </Avatar>
      <div className={divStyles}>
        <p>{user.name}</p>
        {createdDate && <p>{moment(createdDate).fromNow()}</p>}
      </div>
    </Link>
  );
};

export default UserSummary;

const linkStyles = 'flex gap-2 items-center';
const avatarFallbackStyles = 'border-2 border-slate-500 dark:border-slate-50';
const divStyles = 'flex items-center gap-2 text-sm text-blue-500';
