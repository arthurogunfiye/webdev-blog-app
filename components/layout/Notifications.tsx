import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Bell } from 'lucide-react';

const Notifications = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='relative'>
        <div className={notificationBadgeStyles}>
          <span>5</span>
        </div>
        <Bell size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[100%] max-w-[400px]'>
        <div className='flex gap-4 justify-between mb-2 p-2'>
          <h3 className='font-bold text-lg'>Notifications</h3>
          <button>Mark all as read</button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;

const notificationBadgeStyles =
  'absolute bg-rose-500 size-6 rounded-full text-sm flex items-center justify-center bottom-2 left-2';
