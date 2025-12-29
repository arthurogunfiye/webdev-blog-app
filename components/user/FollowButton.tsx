'use client';

import { User } from '@prisma/client';
import Button from '../common/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface FollowButtonProps {
  user: User;
  isFollowing: boolean;
  isList?: boolean;
}

const FollowButton = ({
  user,
  isFollowing: following,
  isList = false
}: FollowButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(following);
  const router = useRouter();

  useEffect(() => {
    setIsFollowing(following);
  }, [following]);

  const handleFollow = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/follow', { followId: user.id });

      if (response.data.success === 'followed') {
        setIsFollowing(true);
        // Send notification
      } else if (response.data.success === 'unfollowed') {
        setIsFollowing(false);
      }
      router.refresh();
    } catch (error: any) {
      console.error('Follow request failed: ', error);
      toast.error('Something went wrong while trying to follow/unfollow!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      outline
      label={loading ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
      onClick={handleFollow}
      disabled={loading}
      small={isList}
    />
  );
};

export default FollowButton;
