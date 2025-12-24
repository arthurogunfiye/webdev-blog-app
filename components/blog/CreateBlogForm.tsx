'use client';

import { BlogSchemaType, BlogSchema } from '@/schemas/BlogSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormField from '../common/FormField';
import AddCoverImage from './AddCoverImage';
import { useEffect, useState, useTransition } from 'react';
import CoverImage from './CoverImage';
import { tags } from '@/lib/tags';
import dynamic from 'next/dynamic';
import Button from '../common/Button';
import Alert from '../common/Alert';
import { createBlog } from '@/actions/blogs/create-blog';
import { editBlog } from '@/actions/blogs/edit-blog';
import { Blog } from '@prisma/client';
import { toast } from 'react-hot-toast';

const BlockNoteEditor = dynamic(
  () => import('../blog/editor/BlockNoteEditor').then(mod => mod.default),
  { ssr: false }
);

const CreateBlogForm = ({ blog }: { blog?: Blog }) => {
  const session = useSession();
  const userId = session.data?.user.userId;

  const [uploadedCover, setUploadedCover] = useState<string>();
  const [content, setContent] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPublishing, startPublishing] = useTransition();
  const [isSavingAsDraft, startSavingAsDraft] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<BlogSchemaType>({
    resolver: zodResolver(BlogSchema),
    defaultValues: blog
      ? {
          userId: blog.userId,
          isPublished: blog.isPublished,
          title: blog.title,
          coverImage: blog.coverImage || undefined,
          tags: blog.tags,
          content: blog.content
        }
      : { userId, isPublished: false }
  });

  useEffect(() => {
    if (uploadedCover) {
      setValue('coverImage', uploadedCover, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });
    }
  }, [uploadedCover]);

  useEffect(() => {
    if (typeof content === 'string') {
      setValue('content', content, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });
    }
  }, [content]);

  useEffect(() => {
    if (blog?.coverImage) {
      setUploadedCover(blog.coverImage);
    }
  }, [blog?.coverImage]);

  const onChange = (content: string) => {
    setContent(content);
  };

  const onPublish: SubmitHandler<BlogSchemaType> = formData => {
    setSuccess('');
    setError('');

    if (formData.tags.length > 4) {
      return setError('You can select a maximum of 4 tags only!');
    }

    startPublishing(() => {
      if (blog) {
        editBlog({ ...formData, isPublished: true }, blog.id).then(response => {
          if (response.success) {
            toast.success(response.success as string);
            setSuccess(response.success as string);
          } else if (response.error) {
            toast.error(response.error);
            setError(response.error);
          }
        });
      } else {
        createBlog({ ...formData, isPublished: true }).then(response => {
          if (response.success) {
            toast.success(response.success as string);
            setSuccess(response.success as string);
          } else if (response.error) {
            toast.error(response.error);
            setError(response.error);
          }
        });
      }
    });
  };

  const onSaveDraft: SubmitHandler<BlogSchemaType> = formData => {
    setSuccess('');
    setError('');

    startSavingAsDraft(() => {
      if (blog) {
        editBlog({ ...formData, isPublished: true }, blog.id).then(response => {
          if (response.success) {
            setSuccess(response.success as string);
          } else if (response.error) {
            setError(response.error);
          }
        });
      } else {
        createBlog({ ...formData, isPublished: false }).then(response => {
          if (response.success) {
            toast.success(response.success as string);
            setSuccess(response.success as string);
          } else if (response.error) {
            toast.error(response.error);
            setError(response.error);
          }
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onPublish)} className={formStyles}>
      <div>
        {!!uploadedCover && (
          <CoverImage
            url={uploadedCover}
            isEditor={true}
            setUploadedCover={setUploadedCover}
          />
        )}

        {!uploadedCover && (
          <AddCoverImage setUploadedCoverImage={setUploadedCover} />
        )}

        <FormField
          id='title'
          register={register}
          errors={errors}
          placeholder='Blog Title'
          disabled={false}
          inputClassNames={inputFieldStyles}
        />

        <fieldset className={fieldsetStyles}>
          <legend className='mb-2 pr-2'>Select 4 tags</legend>
          <div className={tagDivStyles}>
            {tags.map(tag => {
              if (tag === 'All') return null;
              return (
                <label key={tag} className={tagLabelStyles}>
                  <input
                    type='checkbox'
                    value={tag}
                    disabled={false}
                    {...register('tags')}
                  />
                  <span>{tag}</span>
                </label>
              );
            })}
          </div>
          {errors.tags && errors.tags.message && (
            <span className={errorSpanStyles}>
              Select at least one tag and a maximum of 4
            </span>
          )}
        </fieldset>

        <BlockNoteEditor
          onChange={onChange}
          initialContent={blog?.content ? blog.content : ''}
        />

        {errors.content && errors.content.message && (
          <span className={errorSpanStyles}>
            Content is required and must be at least 10 characters long
          </span>
        )}
      </div>

      <div className='border-t pt-2'>
        {errors.userId && errors.userId.message && (
          <span className={errorSpanStyles}>userId is missing!</span>
        )}
        {success && <Alert message={success} success />}
        {error && <Alert message={error} error />}
        <div className='flex items-center justify-between gap-6'>
          <div>
            <Button type='button' label='Delete' className='bg-red-800' />
          </div>
          <div className='flex gap-4'>
            <Button
              type='submit'
              label={isPublishing ? 'Publishing...' : 'Publish'}
              className='bg-blue-700'
              disabled={isPublishing}
            />
            <Button
              type='button'
              label={isSavingAsDraft ? 'Saving...' : 'Save as Draft'}
              className='bg-green-800'
              onClick={handleSubmit(onSaveDraft)}
              disabled={isSavingAsDraft}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateBlogForm;

const formStyles =
  'flex flex-col justify-between max-w-[1200px] m-auto min-h-[85vh]';

const inputFieldStyles = 'border-none text-5xl font-bold bg-transparent px-0';

const fieldsetStyles = 'flex flex-col border-y mb-4 py-2';

const tagDivStyles = 'flex gap-4 flex-wrap w-full';

const tagLabelStyles = 'flex items-center space-x-2';

const errorSpanStyles = 'text-sm text-rose-400';
