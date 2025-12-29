'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { UserWithFollows } from './UserProfile';
import UserSummary from '../blog/UserSummary';
import FollowButton from './FollowButton';

const FollowersList = ({ user }: { user: UserWithFollows }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <span>
            {user._count.followers}{' '}
            {user._count.followers <= 1 ? 'Follower' : 'Followers'}
          </span>
        </DialogTrigger>
        <DialogContent className='max-w-[500px] w-[90%]'>
          <DialogHeader>
            <DialogTitle>Followers</DialogTitle>
          </DialogHeader>
          <DialogDescription className='hidden'>
            A list of users following this user
          </DialogDescription>
          <div>
            {user.followers.map(item => {
              return (
                <div
                  key={item.follower.id}
                  className='flex gap-8 items-center justify-between'
                >
                  <UserSummary user={item.follower} />
                  <FollowButton
                    user={item.follower}
                    isFollowing={!!item.follower.followers.length}
                    isList={true}
                  />
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FollowersList;
