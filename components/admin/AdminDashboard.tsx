import { getCounts } from '@/actions/admin/getCounts';
import Heading from '../common/Heading';
import Alert from '../common/Alert';

const AdminDashboard = async () => {
  const { success, error } = await getCounts();
  const numberOfUsers = success?.userCount || 0;
  const numberOfBlogs = success?.blogCount || 0;

  if (error) return <Alert error message={error} />;

  return (
    <div>
      <Heading title='Analytics' center lg />
      <div className={infoDivStyles}>
        <div className={spanDivStyles}>
          <span className='font-bold'>{numberOfUsers}</span>
          <span>Users</span>
        </div>
        <div className={spanDivStyles}>
          <span className='font-bold'>{numberOfBlogs}</span>
          <span>Blogs</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

const infoDivStyles = 'flex items-center flex-wrap justify-center mt-12 gap-12';
const spanDivStyles =
  'flex flex-col gap-2 items-center border rounded-sm px-12 py-8 text-4xl';
