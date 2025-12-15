'use client';

import { BlogSchemaType, BlogSchema } from '@/schemas/BlogSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import FormField from '../common/FormField';

const CreateBlogForm = () => {
  const session = useSession();
  const userId = session.data?.user.userId;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<BlogSchemaType>({
    resolver: zodResolver(BlogSchema),
    defaultValues: { userId, isPublished: false }
  });

  return (
    <form className={formStyles}>
      <div>
        <FormField
          id='title'
          register={register}
          errors={errors}
          placeholder='Blog Title'
          disabled={false}
          inputClassNames={inputFieldStyles}
        />
      </div>
    </form>
  );
};

export default CreateBlogForm;

const formStyles =
  'flex flex-col justify-between max-w-[1200px] m-auto min-h-[85vh]';

const inputFieldStyles = 'border-none text-5xl font-bold bg-transparent px-0';
