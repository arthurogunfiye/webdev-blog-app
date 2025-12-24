import { getBookmarks } from '@/actions/blogs/get-bookmarks';
import Alert from '@/components/common/Alert';
import ListBlogs from '@/components/blog/ListBlogs';
import Heading from '@/components/common/Heading';

interface BookmarkProps {
  params: Promise<{ page: string }>;
}

const Bookmarks = async ({ params }: BookmarkProps) => {
  const { page } = await params;
  const currentPage = parseInt(page, 10) || 1;

  const { success, error } = await getBookmarks({
    page: currentPage,
    limit: 3
  });

  if (error) {
    return <Alert message='Error fetching blogs!' error />;
  }

  if (!success) {
    return <Alert message='No blogs!' />;
  }

  const { blogs, hasMoreBookmarks } = success;

  return (
    <div>
      <div className='max-w-[800px] m-auto mt-4 px-4'>
        <Heading title='Bookmarks' lg />
      </div>
      <ListBlogs
        blogs={blogs}
        hasMoreBlogs={hasMoreBookmarks}
        currentPage={currentPage}
        page='bookmarksListPage'
      />
    </div>
  );
};

export default Bookmarks;
