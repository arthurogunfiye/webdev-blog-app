import { auth } from '@/auth';
import Alert from '@/components/common/Alert';
import { getUserById } from '@/lib/user';
import db from '@/lib/db';
import EditUserForm from '@/components/user/EditUserForm';

const EditUser = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const user = await getUserById(id);

  if (!user) return <Alert error message='User does not exist!' />;

  const session = await auth();

  if (session?.user.userId !== user.id)
    return <Alert error message='You are not authorised!' />;

  const account = await db.account.findFirst({
    where: { userId: user.id }
  });

  const isThisAnOAuthAccount =
    account?.provider === 'google' || account?.provider === 'github';

  const isCredentials = !isThisAnOAuthAccount;

  return <EditUserForm user={user} isCredentials={isCredentials} />;
};

export default EditUser;
