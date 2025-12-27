'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import queryString from 'query-string';

const Pagination = ({
  currentPage,
  hasMoreBlogs,
  page
}: {
  currentPage: number;
  hasMoreBlogs: boolean;
  page: string;
}) => {
  const params = useSearchParams();
  const currentQuery = queryString.parse(params.toString());
  const searchParams = queryString.stringifyUrl({
    url: '',
    query: currentQuery
  });

  const session = useSession();
  const userId = session?.data?.user.userId;

  return (
    <div className='flex justify-end gap-10 mt-4'>
      {page === 'blogsListPage' && currentPage > 1 && (
        <Link href={`/blog/posts/${currentPage - 1}${searchParams}`}>
          <span>Previous</span>
        </Link>
      )}
      {page === 'blogsListPage' && hasMoreBlogs && (
        <Link href={`/blog/posts/${currentPage + 1}${searchParams}`}>
          <span>Next</span>
        </Link>
      )}

      {page === 'bookmarksListPage' && currentPage > 1 && (
        <Link href={`/blog/bookmarks/${currentPage - 1}${searchParams}`}>
          <span>Previous</span>
        </Link>
      )}
      {page === 'bookmarksListPage' && hasMoreBlogs && (
        <Link href={`/blog/bookmarks/${currentPage + 1}${searchParams}`}>
          <span>Next</span>
        </Link>
      )}

      {page === 'profilePage' && currentPage > 1 && (
        <Link href={`/user/${userId}/${currentPage - 1}${searchParams}`}>
          <span>Previous</span>
        </Link>
      )}
      {page === 'profilePage' && hasMoreBlogs && (
        <Link href={`/user/${userId}/${currentPage + 1}${searchParams}`}>
          <span>Next</span>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
