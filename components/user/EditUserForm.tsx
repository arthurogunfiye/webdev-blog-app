'use client';

import {
  EditProfileSchema,
  EditProfileSchemaType
} from '@/schemas/EditProfileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useTransition } from 'react';
import FormField from '../common/FormField';
import Button from '../common/Button';
import Heading from '../common/Heading';
import Alert from '../common/Alert';
import { User } from '@prisma/client';
import { editUser } from '@/actions/users/edit-user';
import { tags } from '@/lib/tags';

const EditUserForm = ({
  user,
  isCredentials
}: {
  user: User;
  isCredentials: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditProfileSchemaType>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: user.name || undefined,
      bio: user.bio || undefined,
      tags: user.tags || undefined
    }
  });

  const onSubmit: SubmitHandler<EditProfileSchemaType> = data => {
    setError('');
    startTransition(() => {
      editUser(data, user.id).then(response => {
        if (response?.error) {
          setError(response.error);
        }

        if (response?.success) {
          setSuccess(response.success);
        }
      });
    });
  };

  return (
    <form className={formStyles} onSubmit={handleSubmit(onSubmit)}>
      <Heading title='Update Profile' lg />
      <FormField
        id='name'
        type='text'
        register={register}
        errors={errors}
        placeholder='Name'
        disabled={isPending}
        label='Name'
      />
      <FormField
        id='bio'
        type='text'
        register={register}
        errors={errors}
        placeholder='Bio'
        disabled={isPending}
        label='Bio'
      />
      <fieldset className={fieldsetStyles}>
        <legend className='mb-2 pr-2'>Select Tags</legend>
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
      </fieldset>
      {error && <Alert message={error} error />}
      {success && <Alert message={success} success />}
      <Button
        type='submit'
        label={isPending ? 'Saving...' : 'Save Changes'}
        disabled={isPending}
      />
    </form>
  );
};

export default EditUserForm;

const formStyles = 'flex flex-col max-w-[500px] m-auto mt-8 gap-2';
const fieldsetStyles = 'flex flex-col';
const tagDivStyles = 'flex gap-4 flex-wrap w-full';
const tagLabelStyles = 'flex items-center space-x-2';
