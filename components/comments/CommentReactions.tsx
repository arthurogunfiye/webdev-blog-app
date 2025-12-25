'use client';

import { cn } from '@/lib/utils';
import { CommentWithUser } from './ListComments';
import { Dispatch, SetStateAction } from 'react';
import { FaHandsClapping } from 'react-icons/fa6';
import { FaRegComment } from 'react-icons/fa';
import { BsReply } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
import { useSession } from 'next-auth/react';

interface CommentReactionsProps {
  comment: CommentWithUser;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setShowReplies: Dispatch<SetStateAction<boolean>>;
  isThisAReply?: boolean;
}

const CommentReactions = ({
  comment,
  setShowForm,
  setShowReplies,
  isThisAReply
}: CommentReactionsProps) => {
  const session = useSession();
  const userId = session.data?.user.userId;

  const handleReply = () => {
    setShowForm(previousState => !previousState);
  };

  return (
    <div className={cn(parentDivStyles, isThisAReply && 'justify-start')}>
      <div className='flex items-center gap-4'>
        <span className={spanStyles}>
          <FaHandsClapping size={20} /> {4}
        </span>
        {!isThisAReply && (
          <span className={spanStyles}>
            <FaRegComment size={20} />
            Replies {comment._count.replies}
          </span>
        )}
      </div>
      <div className='flex items-center'>
        <span className={replySpanStyles} onClick={handleReply}>
          <BsReply size={20} />
          Reply
        </span>
        {userId === comment.userId && (
          <span className='cursor-pointer'>
            <MdDeleteOutline size={20} />
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentReactions;

const parentDivStyles =
  'flex justify-between items-center w-full text-sm mt-2 gap-4';
const spanStyles = 'flex items-center gap-1 cursor-pointer';
const replySpanStyles = `${spanStyles} mr-4`;
