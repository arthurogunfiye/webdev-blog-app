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
import { deleteUser } from '@/actions/users/delete-user';
import { signOut } from 'next-auth/react';

const EditUserForm = ({
  user,
  isCredentials
}: {
  user: User;
  isCredentials: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleting] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [deleteError, setDeleteError] = useState<string | undefined>('');
  const [deleteSuccess, setDeleteSuccess] = useState<string | undefined>('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditProfileSchemaType>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: user.name || undefined,
      email: user.email || undefined,
      bio: user.bio || undefined,
      tags: user.tags || undefined
    }
  });

  const onSubmit: SubmitHandler<EditProfileSchemaType> = data => {
    setSuccess('');
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

  const onDelete = () => {
    setDeleteSuccess('');
    setDeleteError('');

    startDeleting(() => {
      deleteUser(user.id).then(response => {
        setDeleteError(response.error);
        setDeleteSuccess(response.success);

        if (response.success) {
          setTimeout(() => {
            signOut();
          }, 5000);
        }
      });
    });
  };

  return (
    <>
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
        {isCredentials && (
          <FormField
            id='email'
            type='email'
            register={register}
            errors={errors}
            placeholder='Email'
            disabled={isPending || !isCredentials}
            label='Email'
          />
        )}
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
      <div className='max-w-[500px] m-auto mt-12'>
        <div className='text-rose-500'>
          <Heading title='Danger Zone' />
        </div>
        {deleteError && <Alert message={deleteError} error />}
        {deleteSuccess && <Alert message={deleteSuccess} success />}
        <Button
          label={isDeleting ? 'Deleting...' : 'Delete Account'}
          outline
          type='button'
          className='mt-4'
          onClick={() => onDelete()}
        />
      </div>
    </>
  );
};

export default EditUserForm;

const formStyles = 'flex flex-col max-w-[500px] m-auto mt-8 gap-2';
const fieldsetStyles = 'flex flex-col';
const tagDivStyles = 'flex gap-4 flex-wrap w-full';
const tagLabelStyles = 'flex items-center space-x-2';
