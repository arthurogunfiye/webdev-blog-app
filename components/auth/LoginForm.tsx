'use client';

import { LoginSchema, LoginSchemaType } from '@/schemas/LoginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormField from '../common/FormField';
import Button from '../common/Button';
import Heading from '../common/Heading';
import SocialAuth from './SocialAuth';
import { useState, useTransition } from 'react';
import { login } from '@/actions/auth/login';
import Alert from '../common/Alert';
import { useRouter, useSearchParams } from 'next/navigation';
import { LOGIN_REDIRECT } from '@/routes';
import Link from 'next/link';

const LoginForm = () => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const router = useRouter();

  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with a different provider. Please use another sign-in method!'
      : '';

  const onSubmit: SubmitHandler<LoginSchemaType> = data => {
    setError('');
    startTransition(() => {
      login(data).then(response => {
        if (response?.error) {
          router.replace('/login');
          setError(response.error);
        }

        if (!response?.error) {
          // router.push(LOGIN_REDIRECT);
          window.location.assign(LOGIN_REDIRECT);
        }

        if (response?.success) {
          setSuccess(response.success as string);
        }
      });
    });
  };

  return (
    <form className={formStyles} onSubmit={handleSubmit(onSubmit)}>
      <Heading title='Login to WEBDEV.blog' center lg />
      <FormField
        id='email'
        type='email'
        register={register}
        errors={errors}
        placeholder='email'
        disabled={isPending}
        autocomplete='username'
      />
      <FormField
        id='password'
        type='password'
        register={register}
        errors={errors}
        placeholder='password'
        disabled={isPending}
        defaultValue='12345Qwerty!'
      />
      {error && <Alert message={error} error />}
      {success && <Alert message={success} success />}
      <Button
        type='submit'
        label={isPending ? 'Logging in...' : 'Login'}
        disabled={isPending}
      />
      <div className='flex justify-center my-2'>Or</div>
      <SocialAuth />
      <div className='flex items-end justify-end'>
        <Link href='/password-email-form' className={linkStyles}>
          Forgot Password?
        </Link>
      </div>
      {urlError && <Alert message={urlError} error />}
    </form>
  );
};

export default LoginForm;

const formStyles = 'flex flex-col max-w-[500px] m-auto mt-8 gap-2';
const linkStyles = 'mt-2 text-sm underline text-blue-700 dark:text-blue-300';
