'use client';

import { useEffect, useState, useTransition } from 'react';
import { CommentWithUser } from './ListComments';
import { getComments } from '@/actions/comments/get-comments';
import ReplyCard from './ReplyCard';

const ListReplies = ({
  comment,
  userId
}: {
  comment: CommentWithUser;
  userId?: string;
}) => {
  const [replies, setReplies] = useState<CommentWithUser[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    startTransition(() => {
      getComments(comment.blogId, comment.id, userId).then(response => {
        if (response.error) {
          setError(response.error);
        }

        if (response.success) {
          setReplies(response.success.comments);
        }
      });
    });
  }, [comment, userId]);

  return (
    <div>
      {isPending && <p className='text-amber-500'>Loading...</p>}
      {error && <p className='text-rose-500'>{error}</p>}
      {!isPending &&
        !error &&
        replies.map(reply => {
          return (
            <div key={reply.id}>
              <ReplyCard reply={reply} />
            </div>
          );
        })}
    </div>
  );
};

export default ListReplies;
