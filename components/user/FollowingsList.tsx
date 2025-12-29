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

const FollowingsList = ({ user }: { user: UserWithFollows }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <span>
            {user._count.followings}{' '}
            {user._count.followings <= 1 ? 'Following' : 'Followings'}
          </span>
        </DialogTrigger>
        <DialogContent className='max-w-[500px] w-[90%]'>
          <DialogHeader>
            <DialogTitle>Following</DialogTitle>
          </DialogHeader>
          <DialogDescription className='hidden'>
            A list of users this user is following
          </DialogDescription>
          <div>
            {user.followings.map(item => {
              return (
                <div
                  key={item.following.id}
                  className='flex gap-8 items-center justify-between'
                >
                  <UserSummary user={item.following} />
                  <FollowButton
                    user={item.following}
                    isFollowing={!!item.following.followers.length}
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

export default FollowingsList;
