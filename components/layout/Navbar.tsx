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
  const session = useSession();
  const isUserLoggedIn = session.status === 'authenticated';
  const path = usePathname();
  const router = useRouter();

  // This effect runs whenever the path or user login status changes
  useEffect(() => {
    if (!isUserLoggedIn && path) {
      const updateSession = async () => {
        await session.update();
      };
      updateSession();
    }
  }, [path, isUserLoggedIn]);

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
            {isUserLoggedIn && <Notifications />}
            {isUserLoggedIn && <UserButton />}
            {!isUserLoggedIn && (
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

const navbarStyles = 'sticky top-0 border-b z-50 bg-white dark:bg-slate-950';
const containerDivStyles = 'flex justify-between items-center gap-8';
const logoStyles = 'flex items-center gap-1 cursor-pointer';
const leftMenuStyles = 'flex gap-5 sm:gap-8 items-center';
