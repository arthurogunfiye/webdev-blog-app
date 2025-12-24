import Link from 'next/link';
import { BlogWithUser } from './ListBlogs';
import Image from 'next/image';
import UserSummary from './UserSummary';
import Tag from '../common/Tag';
import Reactions from './Reactions';

const BlogCard = ({
  blog,
  isUserProfile
}: {
  blog: BlogWithUser;
  isUserProfile?: boolean;
}) => {
  return (
    <div className={parentDivStyles}>
      <div>
        {blog.user && (
          <UserSummary user={blog.user} createdDate={blog.createdAt} />
        )}
      </div>
      <div className='my-2 flex justify-between gap-6'>
        <div className='flex flex-col justify-between w-full'>
          <Link
            href={`/blog/${blog.id}`}
            className='text-xl sm:text-2xl font-bold'
          >
            {blog.title}
          </Link>
          {!!blog.tags?.length && (
            <div className={tagsDivStyles}>
              {blog.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
          <Reactions blog={blog} />
        </div>
        {blog.coverImage && (
          <Link href={`/blog/${blog.id}`} className={imgLinkStyles}>
            <Image
              src={blog.coverImage}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              alt={blog.title}
              className='object-cover rounded-md'
              priority
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogCard;

const parentDivStyles =
  'border-b border-slate-300 dark:border-slate-700 py-6 cursor pointer';
const imgLinkStyles = 'w-full max-w-[160px] h-[100px] relative overflow-hidden';
const tagsDivStyles = 'flex flex-wrap items-center gap-4 my-2';
