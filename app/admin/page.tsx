import Container from '@/components/layout/Container';
import Alert from '@/components/common/Alert';
import { auth } from '@/auth';
import AdminDashboard from '@/components/admin/AdminDashboard';

const Admin = async () => {
  const session = await auth();

  const isUserAnAdmin = session?.user.role === 'ADMIN';

  if (!isUserAnAdmin) {
    return (
      <Container>
        <Alert error message='You are not an Admin. Access denied!' />
      </Container>
    );
  }

  return (
    <Container>
      <AdminDashboard />
    </Container>
  );
};

export default Admin;
