import { tags } from '@/lib/tags';
import Tag from '../common/Tag';
import './Tags.css';
import { usePathname, useSearchParams } from 'next/navigation';

const Tags = () => {
  const params = useSearchParams();
  const tag = params.get('tag');
  const pathname = usePathname();

  const isBlogPostPage = pathname.includes('/blog/posts');

  if (!isBlogPostPage) return null;

  return (
    <div className='border-t'>
      <div className={secondDivStyles}>
        <div className={thirdDivStyles}>
          {tags.map(item => {
            return (
              <Tag
                key={item}
                selected={tag === item || (tag === null && item === 'All')}
              >
                {item}
              </Tag>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tags;

const secondDivStyles = 'max-w-[1920px] w-full mx-auto px-4 pt-4 pb-0 xl:px-20';
const thirdDivStyles =
  'flex flex-row items-center justify-start gap-6 sm:gap-12 overflow-x-auto pb-2 tags-container';
