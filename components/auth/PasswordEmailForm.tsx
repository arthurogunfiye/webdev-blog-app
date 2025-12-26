'use client';

import {
  PasswordEmailSchema,
  PasswordEmailSchemaType
} from '@/schemas/PasswordEmailSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useTransition } from 'react';
import FormField from '../common/FormField';
import Button from '../common/Button';
import Heading from '../common/Heading';
import Alert from '../common/Alert';
import { passwordEmail } from '@/actions/auth/password-email';

const PasswordEmailForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PasswordEmailSchemaType>({
    resolver: zodResolver(PasswordEmailSchema)
  });

  const onSubmit: SubmitHandler<PasswordEmailSchemaType> = data => {
    setError('');
    startTransition(() => {
      passwordEmail(data).then(response => {
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
      <Heading title='Forgot your WEBDEV.blog password?' center lg />
      <FormField
        id='email'
        type='email'
        register={register}
        errors={errors}
        placeholder='Enter your email'
        disabled={isPending}
      />
      {error && <Alert message={error} error />}
      {success && <Alert message={success} success />}
      <Button
        type='submit'
        label={isPending ? 'Submitting...' : 'Send Reset Email'}
        disabled={isPending}
      />
    </form>
  );
};

export default PasswordEmailForm;

const formStyles = 'flex flex-col max-w-[500px] m-auto mt-8 gap-2';
