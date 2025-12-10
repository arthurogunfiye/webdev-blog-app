import {
  IoIosCheckmarkCircleOutline,
  IoIosInformationCircleOutline
} from 'react-icons/io';
import { BiError } from 'react-icons/bi';
import { cn } from '@/lib/utils';

const Alert = ({
  success,
  error,
  message
}: {
  success?: boolean;
  error?: boolean;
  message: string;
}) => {
  return (
    <div
      className={cn(
        alertClasses,
        success && successClasses,
        error && errorClasses,
        !success && !error && infoClasses
      )}
    >
      <span>
        {success && <IoIosCheckmarkCircleOutline size={20} />}
        {error && <BiError size={20} />}
        {!success && !error && <IoIosInformationCircleOutline size={20} />}
      </span>
      {message}
    </div>
  );
};

export default Alert;

const alertClasses = 'my-2 flex items-center gap-2 p-3 rounded-md';
const successClasses = 'bg-green-100 text-green-500';
const errorClasses = 'bg-red-100 text-rose-500';
const infoClasses = 'bg-blue-100 text-blue-500';
