import { getBlogById } from '@/actions/blogs/getBlogById';
import UserSummary from '@/components/blog/UserSummary';
import Alert from '@/components/common/Alert';
import Image from 'next/image';
import { auth } from '@/auth';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import Reactions from '@/components/blog/Reactions';
import Tag from '@/components/common/Tag';
import BlockNoteEditor from '@/components/blog/editor/BlockNoteEditorWrapper';
import './editor.css';

interface BlogContentProps {
  params: Promise<{ id: string }>;
}

const BlogContent = async ({ params }: BlogContentProps) => {
  const session = await auth();
  const { id } = await params;

  const response = await getBlogById({ blogId: id });

  if (!response.success) {
    return <Alert error message='Error fetching blog content!' />;
  }

  const blog = response.success.blog;

  if (!blog) {
    return <Alert error message='Blog not found!' />;
  }

  return (
    <div className={parentDivStyles}>
      {blog.coverImage && (
        <div className={coverImageDivStyles}>
          <Image
            src={blog.coverImage}
            fill
            alt='Cover Image'
            className='object-cover rounded'
            sizes='(max-width: 900px) 100vw, 900px'
            priority
          />
        </div>
      )}

      <div className={userDivStyles}>
        {blog.user && (
          <UserSummary user={blog.user} createdDate={blog.createdAt} />
        )}
        {session?.user?.userId === blog.userId && (
          <Link href={`/blog/edit/${blog.id}`} className={editLinkStyles}>
            Edit
          </Link>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <Separator />
        <Reactions blog={blog} />
        <Separator />
      </div>
      <h2 className='text-4xl font-bold'>{blog.title}</h2>
      {!!blog.tags.length && (
        <div className={tagsDivStyles}>
          {blog.tags.map(tag => {
            return <Tag key={tag}>{tag}</Tag>;
          })}
        </div>
      )}
      <div>
        <BlockNoteEditor editable={false} initialContent={blog.content} />
      </div>
    </div>
  );
};

export default BlogContent;

const parentDivStyles = 'flex flex-col max-w-[900px] m-auto gap-6';
const coverImageDivStyles = 'relative w-full h-[35vh] mt-2';
const userDivStyles = 'flex justify-between items-center pt-4';
const editLinkStyles = 'text-orange-400';
const tagsDivStyles = 'flex items-center flex-wrap gap-4';
