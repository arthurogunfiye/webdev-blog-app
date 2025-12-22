import { Blog, User } from '@prisma/client';
import BlogCard from './BlogCard';
import Pagination from './Pagination';

export type BlogWithUser = Blog & {
  user: Pick<User, 'id' | 'name' | 'image'>;
};

interface ListBlogsProps {
  blogs: BlogWithUser[];
  hasMoreBlogs: boolean;
  currentPage: number;
  isUserProfile?: boolean;
}

const ListBlogs = ({
  blogs,
  hasMoreBlogs,
  currentPage,
  isUserProfile
}: ListBlogsProps) => {
  return (
    <>
      {blogs.length === 0 && (
        <>
          <p className='text-center mt-10'>
            No blogs found that match your search or tag 😔
          </p>
          <p className='text-center mt-4'>Try again please...</p>
        </>
      )}
      <div className={parentDivStyles}>
        <section>
          {blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} isUserProfile={isUserProfile} />
          ))}
        </section>

        <Pagination currentPage={currentPage} hasMoreBlogs={hasMoreBlogs} />
      </div>
    </>
  );
};

export default ListBlogs;

const parentDivStyles =
  'flex flex-col max-w-[800px] m-auto justify-between min-h-[85vh] px-4 pt-2';
