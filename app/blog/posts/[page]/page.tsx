import { getPublishedBlogs } from '@/actions/blogs/get-published-blogs';
import ListBlogs from '@/components/blog/ListBlogs';
import Alert from '@/components/common/Alert';

interface BlogFeedProps {
  params: Promise<{ page: string }>;
  searchParams: Promise<{
    tag: string;
    title: string;
  }>;
}

const BlogFeed = async ({ params, searchParams }: BlogFeedProps) => {
  const { page } = await params;
  const searchObject = await searchParams;
  const currentPage = parseInt(page, 10) || 1;

  const { success, error } = await getPublishedBlogs({
    page: currentPage,
    limit: 3,
    searchObject
  });

  if (error) {
    return <Alert message='Error fetching blogs!' error />;
  }

  if (!success) {
    return <Alert message='No posts!' />;
  }

  const { blogs, hasMoreBlogs } = success;

  return (
    <div>
      <ListBlogs
        blogs={blogs}
        hasMoreBlogs={hasMoreBlogs}
        currentPage={currentPage}
        page='blogsListPage'
      />
    </div>
  );
};

export default BlogFeed;
