import { Comment, User } from '@prisma/client';
import CommentCard from './CommentCard';

export type CommentWithUser = Comment & {
  user: Pick<User, 'id' | 'name' | 'image'>;
  repliedToUser: Pick<User, 'id' | 'name'> | null;
  _count: {
    replies: number;
  };
};

const ListComments = ({ comments }: { comments: CommentWithUser[] }) => {
  return (
    <div className='mt-4' id='comments'>
      {comments.map(comment => {
        return (
          <div key={comment.id} id={comment.id}>
            <CommentCard comment={comment} />
          </div>
        );
      })}
    </div>
  );
};

export default ListComments;
