'use client';

import { MdNoteAlt } from 'react-icons/md';
import Container from './Container';
import ThemeToggle from './ThemeToggle';
import SearchInput from './SearchInput';
import Notifications from './Notifications';
import UserButton from './UserButton';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Tags from './Tags';

const Navbar = () => {
  const { status } = useSession();
  const router = useRouter();

  return (
    <nav className={navbarStyles}>
      <Container>
        <div className={containerDivStyles}>
          <div
            className={logoStyles}
            onClick={() => router.push('/blog/posts/1')}
          >
            <MdNoteAlt size={24} />
            <div className='font-bold text-xl'>WEBDEV.blog</div>
          </div>
          <SearchInput />
          <div className={leftMenuStyles}>
            <ThemeToggle />
            {status === 'loading' ? (
              <div className={loadingStateStyles}></div>
            ) : status === 'authenticated' ? (
              <>
                <Notifications />
                <UserButton />
              </>
            ) : (
              <>
                <Link href='/login'>Login</Link>
                <Link href='/register'>Register</Link>
              </>
            )}
          </div>
        </div>
      </Container>
      <Tags />
    </nav>
  );
};

export default Navbar;

const loadingStateStyles = 'size-10 rounded-full bg-slate-200 animate-pulse';
const navbarStyles = 'sticky top-0 border-b z-50 bg-white dark:bg-slate-950';
const containerDivStyles = 'flex justify-between items-center gap-8';
const logoStyles = 'flex items-center gap-1 cursor-pointer';
const leftMenuStyles = 'flex gap-5 sm:gap-8 items-center';
