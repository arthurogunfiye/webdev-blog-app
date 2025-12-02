import { MdNoteAlt } from 'react-icons/md';
import Container from './Container';
import ThemeToggle from './ThemeToggle';
import SearchInput from './SearchInput';
import Notifications from './Notifications';
import UserButton from './UserButton';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className={navbarStyles}>
      <Container>
        <div className={containerDivStyles}>
          <div className={logoStyles}>
            <Link href='/'>
              <MdNoteAlt size={24} />
            </Link>
            <div className='font-bold text-xl'>
              <Link href='/'>WEBDEV.blog</Link>
            </div>
          </div>
          <SearchInput />
          <div className={leftMenuStyles}>
            <ThemeToggle />
            <Notifications />
            <UserButton />
            <>
              <Link href='/login'>Login</Link>
              <Link href='/register'>Register</Link>
            </>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;

const navbarStyles = 'sticky top-0 border-b z-50 bg-white dark:bg-slate-950';
const containerDivStyles = 'flex justify-between items-center gap-8';
const logoStyles = 'flex items-center gap-1 cursor-pointer';
const leftMenuStyles = 'flex gap-5 sm:gap-8 items-center';
