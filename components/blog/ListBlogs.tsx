import { Blog, User } from '@prisma/client';
import Link from 'next/link';
import BlogCard from './BlogCard';

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
    <div className={parentDivStyles}>
      <section>
        {blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} isUserProfile={isUserProfile} />
        ))}
      </section>

      <div className='flex justify-between mt-4'>
        {currentPage > 1 && (
          <Link href={`/blog/posts/${currentPage - 1}`}>
            <span>Previous</span>
          </Link>
        )}
        {hasMoreBlogs && (
          <Link href={`/blog/posts/${currentPage + 1}`}>
            <span>Next</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ListBlogs;

const parentDivStyles =
  'flex flex-col max-w-[800px] m-auto justify-between min-h-[85vh] px-4 pt-2';
