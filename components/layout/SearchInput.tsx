'use client';

import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useDebounceValue } from '@/hooks/useDebounceValue';

const SearchInput = () => {
  const params = useSearchParams();
  const title = params.get('title');
  const [value, setValue] = useState(title || '');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const debounceValue = useDebounceValue<string>(value);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return; // Don't run logic until mounted

    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    // Set the input value based on the title query parameter
    const updatedQuery = {
      ...currentQuery,
      title: debounceValue
    };

    // Remove page number when changing tag
    const url = queryString.stringifyUrl(
      {
        url: `/blog/posts/1`,
        query: updatedQuery
      },
      { skipNull: true, skipEmptyString: true }
    );

    // Navigate to the new URL
    router.push(url);
  }, [debounceValue]);

  const handleOnchange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value);
  };

  const isBlogPostPage = pathname.includes('/blog/posts');

  if (!mounted || !isBlogPostPage) return null;

  return (
    <div className='relative hidden sm:block'>
      <Search className={searchIconStyles} />
      <Input
        placeholder='Search...'
        className={searchInputStyles}
        id='search-input'
        value={value}
        onChange={handleOnchange}
      />
    </div>
  );
};

export default SearchInput;

const searchInputStyles = 'pl-10 bg-primary/10';
const searchIconStyles = 'absolute top-2.5 left-3 size-4 text-muted-foreground';
