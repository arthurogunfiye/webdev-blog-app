'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormField from '../common/FormField';
import Button from '../common/Button';
import Heading from '../common/Heading';
import SocialAuth from './SocialAuth';
import { RegisterSchema, RegisterSchemaType } from '@/schemas/RegisterSchema';
import { signUp } from '@/actions/auth/register';
import { useState, useTransition } from 'react';
import Alert from '../common/Alert';
import { toast } from 'react-hot-toast';

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });

  const onSubmit: SubmitHandler<RegisterSchemaType> = data => {
    setSuccess('');
    setError('');
    startTransition(() => {
      signUp(data).then(response => {
        if (response.error) {
          toast.error(response.error);
          setError(response.error);
        }

        if (response.success) {
          toast.success(response.success);
          setSuccess(response.success);
        }
      });
    });
  };

  return (
    <form className={formStyles} onSubmit={handleSubmit(onSubmit)}>
      <Heading title='Create a WEBDEV.blog Account' center lg />
      <FormField
        id='name'
        type='text'
        register={register}
        errors={errors}
        placeholder='name'
        disabled={isPending}
      />
      <FormField
        id='email'
        type='email'
        register={register}
        errors={errors}
        placeholder='email'
        disabled={isPending}
      />
      <FormField
        id='password'
        type='password'
        register={register}
        errors={errors}
        placeholder='password'
        defaultValue='12345Qwerty!'
        disabled={isPending}
      />
      <FormField
        id='confirmPassword'
        type='password'
        register={register}
        errors={errors}
        placeholder='confirm password'
        defaultValue='12345Qwerty!'
        disabled={isPending}
      />

      {error && <Alert message={error} error />}
      {success && <Alert message={success} success />}
      <Button
        type='submit'
        label={isPending ? 'Submitting...' : 'Register'}
        disabled={isPending}
      />
      <div className='flex justify-center my-2'>Or</div>
      <SocialAuth />
    </form>
  );
};

export default RegisterForm;

const formStyles = 'flex flex-col max-w-[500px] m-auto mt-8 gap-2';
