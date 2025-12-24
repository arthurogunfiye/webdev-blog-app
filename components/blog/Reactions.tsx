'use client';

import { PiHandsClapping } from 'react-icons/pi';
import { FaBookmark, FaRegBookmark, FaRegComment } from 'react-icons/fa';
import { FaHandsClapping } from 'react-icons/fa6';
import { useState } from 'react';
import { BlogWithUser } from './ListBlogs';
import { useSession } from 'next-auth/react';
import { clapBlog } from '@/actions/blogs/clap-blog';
import { bookmarkBlog } from '@/actions/blogs/bookmark-blog';
import { useRouter } from 'next/navigation';

const Reactions = ({ blog }: { blog: BlogWithUser }) => {
  const session = useSession();
  const userId = session.data?.user.userId;
  const [clapCount, setClapCount] = useState(blog._count.claps);
  const [userHasClapped, setUserHasClapped] = useState(!!blog.claps.length);
  const [userHasBookmarked, setUserHasBookmarked] = useState(
    !!blog.bookmarks.length
  );
  const router = useRouter();

  const handleClap = async () => {
    if (!userId) return;
    setClapCount(prevCount => (userHasClapped ? prevCount - 1 : prevCount + 1));
    setUserHasClapped(prevState => !prevState);
    await clapBlog(blog.id, userId);
    router.refresh();
  };

  const handleBookmark = async () => {
    if (!userId) return;
    setUserHasBookmarked(prevState => !prevState);
    await bookmarkBlog(blog.id, userId);
    router.refresh();
  };

  return (
    <div className={parentDivStyles}>
      <div className='flex items-center gap-4'>
        <span className={clappingSpanStyles} onClick={handleClap}>
          {userHasClapped ? (
            <FaHandsClapping size={20} />
          ) : (
            <PiHandsClapping size={20} />
          )}
          {clapCount}
        </span>
        <span className={commentSpanStyles}>
          <FaRegComment size={18} />
          {3}
        </span>
      </div>
      <div>
        <span onClick={handleBookmark}>
          {userHasBookmarked ? <FaBookmark /> : <FaRegBookmark size={18} />}
        </span>
      </div>
    </div>
  );
};

export default Reactions;

const parentDivStyles = 'flex justify-between items-center w-full text-sm';
const clappingSpanStyles = 'mr-4 flex items-center gap-1 cursor-pointer';
const commentSpanStyles = 'flex items-center gap-1 cursor-pointer';
