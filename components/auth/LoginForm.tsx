'use client';

import { LoginSchema, LoginSchemaType } from '@/schemas/LoginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormField from '../common/FormField';
import Button from '../common/Button';
import Heading from '../common/Heading';
import SocialAuth from './SocialAuth';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<LoginSchemaType> = data => {
    console.log('Form data: ', data);
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
        defaultValue='arthur.ogunfuye@email.com'
      />
      <FormField
        id='password'
        type='password'
        register={register}
        errors={errors}
        placeholder='password'
        defaultValue='12345Qwerty!'
      />
      <Button type='submit' label='Login' />
      <div className='flex justify-center my-2'>Or</div>
      <SocialAuth />
    </form>
  );
};

export default LoginForm;

const formStyles = 'flex flex-col max-w-[500px] m-auto mt-8 gap-2';
