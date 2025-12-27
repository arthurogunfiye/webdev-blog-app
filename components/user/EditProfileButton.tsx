'use client';

import { User } from '@prisma/client';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';

const EditProfileButton = ({ user }: { user: User }) => {
  const router = useRouter();
  return (
    <Button label='Edit' onClick={() => router.push(`/user/edit/${user.id}`)} />
  );
};

export default EditProfileButton;
