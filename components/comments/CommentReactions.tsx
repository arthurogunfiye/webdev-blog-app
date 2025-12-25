'use client';

import { cn } from '@/lib/utils';
import { CommentWithUser } from './ListComments';
import { Dispatch, SetStateAction, useState } from 'react';
import { FaHandsClapping } from 'react-icons/fa6';
import { FaRegComment } from 'react-icons/fa';
import { BsReply } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import { deleteComment } from '@/actions/comments/delete-comment';
import { toast } from 'react-hot-toast';
import { PiHandsClapping } from 'react-icons/pi';
import { clapComment } from '@/actions/comments/clap-comment';

interface CommentReactionsProps {
  comment: CommentWithUser;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setShowReplies?: Dispatch<SetStateAction<boolean>>;
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
  const [clapCount, setClapCount] = useState(comment._count.claps);
  const [userHasClapped, setUserHasClapped] = useState(!!comment.claps.length);

  const handleReply = () => {
    setShowForm(previousState => !previousState);
  };

  const handleShowReplies = () => {
    if (setShowReplies) {
      setShowReplies(previousState => !previousState);
    }
  };

  const handleDelete = async () => {
    if (userId) {
      const response = await deleteComment(comment.id, userId);

      if (response.error) {
        toast.error(response.error);
      }

      if (response.success) {
        toast.success(response.success);
      }
    }
  };

  const handleClap = async () => {
    if (!userId) return;
    setClapCount(prevCount => (userHasClapped ? prevCount - 1 : prevCount + 1));
    setUserHasClapped(prevState => !prevState);
    await clapComment(comment.id, userId);
  };

  return (
    <div className={cn(parentDivStyles, isThisAReply && 'justify-start')}>
      <div className='flex items-center gap-4'>
        <span className={spanStyles} onClick={handleClap}>
          {userHasClapped ? (
            <FaHandsClapping size={20} />
          ) : (
            <PiHandsClapping size={20} />
          )}
          {clapCount}
        </span>
        {!isThisAReply && (
          <span className={spanStyles} onClick={handleShowReplies}>
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
          <span className='cursor-pointer' onClick={handleDelete}>
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
