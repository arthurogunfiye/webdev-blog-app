import db from '@/lib/db';
import UserProfile from '@/components/user/UserProfile';
import Alert from '@/components/common/Alert';
import { auth } from '@/auth';

const Profile = async ({
  params
}: {
  params: Promise<{ id: string; page: string }>;
}) => {
  const { id, page } = await params;
  const session = await auth();
  const currentUserId = session?.user.userId;

  const user = await db.user.findUnique({ where: { id } });

  if (!user) return <Alert error message='User does not exist!' />;

  const follow = await db.follow.findFirst({
    where: { followingId: user.id, followerId: currentUserId }
  });

  return <UserProfile user={user} page={page} isFollowing={Boolean(follow)} />;
};

export default Profile;
