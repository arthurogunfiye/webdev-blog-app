'use client';

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

  return (
    <div className='flex justify-between mt-4'>
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
    </div>
  );
};

export default Pagination;
