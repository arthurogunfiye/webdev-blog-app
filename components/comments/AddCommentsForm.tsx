'use client';

import { CommentSchema, CommentSchemaType } from '@/schemas/CommentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../common/Button';
import TextAreaField from '../common/TextAreaField';
import { addComment } from '@/actions/comments/add-comments';
import { toast } from 'react-hot-toast';

interface IAddCommentProps {
  blogId: string;
  userId: string;
  parentId?: string;
  repliedToId?: string;
  placeholder?: string;
  creatorId?: string;
}

const AddCommentsForm = ({
  blogId,
  userId,
  parentId,
  repliedToId,
  placeholder,
  creatorId
}: IAddCommentProps) => {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CommentSchemaType>({
    resolver: zodResolver(CommentSchema)
  });

  console.log('Comment creator id>>> ', creatorId); // Remove this later

  const onSubmit: SubmitHandler<CommentSchemaType> = data => {
    startTransition(async () => {
      await addComment({
        values: data,
        userId,
        blogId,
        parentId,
        repliedToUserId: repliedToId
      }).then(response => {
        if (response.error) return toast.error(response.error);
        if (response.success) {
          toast.success(response.success);
          reset();
        }
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col my-2'>
      <TextAreaField
        id='content'
        register={register}
        errors={errors}
        placeholder={placeholder ? placeholder : 'Add comment'}
        disabled={isPending}
      />
      <div>
        <Button
          type='submit'
          label={isPending ? 'Submitting...' : 'Submit'}
          disabled={isPending}
        />
      </div>
    </form>
  );
};

export default AddCommentsForm;
