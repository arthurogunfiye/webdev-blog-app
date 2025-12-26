import { Blog, User } from '@prisma/client';
import BlogCard from './BlogCard';
import Pagination from './Pagination';

export type BlogWithUser = Blog & {
  user: Pick<User, 'id' | 'name' | 'image'>;
  _count: { claps: number; comments: number };
  claps: { id: string }[];
  bookmarks: { id: string }[];
};

interface ListBlogsProps {
  blogs: BlogWithUser[];
  hasMoreBlogs: boolean;
  currentPage: number;
  isUserProfile?: boolean;
  page: string;
}

const ListBlogs = ({
  blogs,
  hasMoreBlogs,
  currentPage,
  isUserProfile,
  page
}: ListBlogsProps) => {
  return (
    <>
      {page === 'blogsListPage' && blogs.length === 0 && (
        <>
          <p className='text-center mt-10'>
            No blogs found that match your search or tag 😔
          </p>
          <p className='text-center mt-4'>Try again please...</p>
        </>
      )}
      {page === 'bookmarksListPage' && blogs.length === 0 && (
        <>
          <p className='text-center mt-10'>
            You do not have any blogs bookmarked
          </p>
          <p className='text-center mt-4'>Go bookmark some blogs 😊</p>
        </>
      )}
      <div className={parentDivStyles}>
        <section>
          {blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} isUserProfile={isUserProfile} />
          ))}
        </section>

        <Pagination
          currentPage={currentPage}
          hasMoreBlogs={hasMoreBlogs}
          page={page}
        />
      </div>
    </>
  );
};

export default ListBlogs;

const parentDivStyles =
  'flex flex-col max-w-[800px] m-auto justify-between min-h-[85vh] px-4 pt-2';
