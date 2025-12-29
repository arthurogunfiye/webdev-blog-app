import { User } from '@prisma/client';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Calendar, UserRound } from 'lucide-react';
import moment from 'moment';
import { getBlogsByUserId } from '@/actions/blogs/getBlogsByUserId';
import Alert from '../common/Alert';
import ListBlogs from '../blog/ListBlogs';
import EditProfileButton from './EditProfileButton';
import Tag from '../common/Tag';
import FollowButton from './FollowButton';
import { auth } from '@/auth';

const UserProfile = async ({
  user,
  page,
  isFollowing
}: {
  user: User;
  page: string;
  isFollowing: boolean;
}) => {
  const currentPage = parseInt(page, 10) || 1;
  const session = await auth();
  const userId = session?.user.userId; // Currently logged in user

  const { success, error } = await getBlogsByUserId({
    page: currentPage,
    limit: 3,
    userId: user.id
  });

  return (
    <div className={parentDivStyles}>
      <div className={firstDivStyles}>
        <div className={userInfoDivStyles}>
          <Avatar className='size-20'>
            <AvatarImage src={user?.image ? user?.image : ''} />
            <AvatarFallback className={avatarFallbackStyles}>
              <UserRound />
            </AvatarFallback>
          </Avatar>
          <div className={userBioStyles}>
            <h1 className={h1nameStyles}>{user.name}</h1>
            {user.bio && <p>{user.bio}</p>}
            <div className={followxDivStyles}>
              <span>Followers</span>
              <span>Following</span>
            </div>
          </div>
        </div>
        <div>
          {userId === user.id ? (
            <EditProfileButton user={user} />
          ) : (
            <FollowButton user={user} isFollowing={isFollowing} />
          )}
        </div>
      </div>
      <div className={secondDivStyles}>
        <div className={idEmailDivStyles}>
          <span>
            Id: <span className={idEmailSpanStyles}>{user.id}</span>
          </span>
          <span>
            Email: <span className={idEmailSpanStyles}>{user.email}</span>
          </span>
        </div>
        <div className={memberSinceDivStyles}>
          <Calendar size={18} /> Member Since{' '}
          {moment(user.createdAt).format('MMMM Do YYYY')}
        </div>
      </div>
      <div>
        {!!user.tags.length && (
          <div className={tagsDivStyles}>
            {user.tags.map(tag => {
              return <Tag key={tag}>{tag}</Tag>;
            })}
          </div>
        )}
      </div>
      <div>
        {error && <Alert error message={error} />}
        {success && (
          <ListBlogs
            blogs={success.blogs}
            hasMoreBlogs={success.hasMoreBlogs}
            currentPage={currentPage}
            isUserProfile={true}
            page='profilePage'
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;

const parentDivStyles = 'max-w-[1200px] m-auto p-4';
const firstDivStyles = 'flex gap-6 justify-between';
const secondDivStyles =
  'flex gap-4 flex-col items-center justify-center p-6 border-y mt-6 flex-wrap';
const userInfoDivStyles =
  'flex items-start sm:items-center gap-6 flex-col sm:flex-row';
const avatarFallbackStyles = 'border-2 border-slate-500 dark:border-slate-50';
const userBioStyles = 'flex flex-col gap-2';
const h1nameStyles = 'text-xl sm:text-3l font-bold';
const followxDivStyles = 'flex items-center gap-4';
const memberSinceDivStyles = 'flex justify-center items-center gap-2';
const idEmailSpanStyles = 'bg-secondary ml-2 py-1 px-2 rounded';
const idEmailDivStyles = 'flex items-center justify-center gap-6 flex-wrap';
const tagsDivStyles =
  'flex items-center justify-center p-6 border-b mb-6 gap-4 flex-wrap';
