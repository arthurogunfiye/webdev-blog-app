'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormField from '../common/FormField';
import Button from '../common/Button';
import Heading from '../common/Heading';
import SocialAuth from './SocialAuth';
import { RegisterSchema, RegisterSchemaType } from '@/schemas/RegisterSchema';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });

  const onSubmit: SubmitHandler<RegisterSchemaType> = data => {
    console.log('Form data: ', data);
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
        defaultValue='Arthur Ogunfuye'
      />
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
      <FormField
        id='confirmPassword'
        type='password'
        register={register}
        errors={errors}
        placeholder='confirm password'
        defaultValue='12345Qwerty!'
      />
      <Button type='submit' label='Register' />
      <div className='flex justify-center my-2'>Or</div>
      <SocialAuth />
    </form>
  );
};

export default RegisterForm;

const formStyles = 'flex flex-col max-w-[500px] m-auto mt-8 gap-2';
