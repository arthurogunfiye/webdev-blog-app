import { getBlogById } from '@/actions/blogs/getBlogById';
import CreateBlogForm from '@/components/blog/CreateBlogForm';
import Alert from '@/components/common/Alert';
import Container from '@/components/layout/Container';

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

const EditBlogPage = async ({ params }: EditBlogPageProps) => {
  const { id } = await params;

  const response = await getBlogById({ blogId: id });

  if (!response.success) {
    return <Alert message='Error fetching blog!' error />;
  }

  const blog = response.success.blog;

  if (!blog) {
    return <Alert message='Blog not found!' error />;
  }

  return (
    <Container>
      <CreateBlogForm blog={blog} />
    </Container>
  );
};

export default EditBlogPage;
