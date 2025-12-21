'use client';

import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useCallback } from 'react';

interface TagProps {
  children: React.ReactNode;
  selected?: boolean;
}

const Tag = ({ children, selected }: TagProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    if (children === 'All') {
      router.push(`/blog/posts/1`);
    } else {
      let currentQuery = {};
      if (params) {
        currentQuery = queryString.parse(params.toString());
      }

      // Update tag in query parameters
      const updatedQuery: any = {
        ...currentQuery,
        tag: children
      };

      // Remove page number when changing tag
      const url = queryString.stringifyUrl(
        {
          url: `/blog/posts/1`,
          query: updatedQuery
        },
        { skipNull: true }
      );

      // Navigate to the new URL
      router.push(url);
    }
  }, [children, params, router]);

  return (
    <span
      className={cn(spanStyles, selected && selectedStyles)}
      onClick={handleClick}
    >
      {children}
    </span>
  );
};

export default Tag;

const spanStyles = 'bg-secondary px-2 py-1 rounded text-sm cursor-pointer';
const selectedStyles = 'bg-primary text-secondary';
