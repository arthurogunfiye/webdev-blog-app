'use client';

import {
  PasswordResetSchema,
  PasswordResetSchemaType
} from '@/schemas/PasswordResetSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FormField from '../common/FormField';
import Button from '../common/Button';
import Heading from '../common/Heading';
import Alert from '../common/Alert';
import { passwordReset } from '@/actions/auth/password-reset';

const PasswordResetFormClient = () => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const token = searchParams.get('token');

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PasswordResetSchemaType>({
    resolver: zodResolver(PasswordResetSchema)
  });

  const onSubmit: SubmitHandler<PasswordResetSchemaType> = data => {
    setError('');
    startTransition(() => {
      passwordReset(data, token).then(response => {
        if (response.error) {
          setError(response.error);
        }

        if (response.success) {
          setSuccess(response.success);
          setTimeout(() => {
            router.push('/login');
          }, 1000);
        }
      });
    });
  };

  return (
    <form className={formStyles} onSubmit={handleSubmit(onSubmit)}>
      <Heading title='Reset your WEBDEV.blog password' center lg />
      <FormField
        id='password'
        type='password'
        register={register}
        errors={errors}
        placeholder='Enter your new password'
        disabled={isPending}
      />
      <FormField
        id='confirmPassword'
        type='password'
        register={register}
        errors={errors}
        placeholder='Enter your new password'
        disabled={isPending}
      />
      {error && <Alert message={error} error />}
      {success && <Alert message={success} success />}
      <Button
        type='submit'
        label={isPending ? 'Saving...' : 'Save New Password'}
        disabled={isPending}
      />
    </form>
  );
};

export default PasswordResetFormClient;

const formStyles = 'flex flex-col max-w-[500px] m-auto mt-8 gap-2';

// 12345qwert$
