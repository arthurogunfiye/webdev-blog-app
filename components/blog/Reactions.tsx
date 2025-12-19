import { PiHandsClapping } from 'react-icons/pi';
import { FaRegBookmark, FaRegComment } from 'react-icons/fa';

const Reactions = () => {
  return (
    <div className={parentDivStyles}>
      <div className='flex items-center gap-4'>
        <span className={clappingSpanStyles}>
          <PiHandsClapping size={20} />
          {7}
        </span>
        <span className={commentSpanStyles}>
          <FaRegComment size={18} />
          {3}
        </span>
      </div>
      <div>
        <FaRegBookmark size={18} />
      </div>
    </div>
  );
};

export default Reactions;

const parentDivStyles = 'flex justify-between items-center w-full text-sm';
const clappingSpanStyles = 'mr-4 flex items-center gap-1 cursor-pointer';
const commentSpanStyles = 'flex items-center gap-1 cursor-pointer';
