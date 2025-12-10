'use server';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/lib/user';
import { LOGIN_REDIRECT } from '@/routes';
import { LoginSchema, LoginSchemaType } from '@/schemas/LoginSchema';
import { AuthError } from 'next-auth';

export const login = async (formData: LoginSchemaType) => {
  const validateFields = LoginSchema.safeParse(formData);

  if (!validateFields.success) {
    return { success: false, error: 'Invalid fields!' };
  }

  const { email, password } = validateFields.data;

  const user = await getUserByEmail(email);

  if (!user || !email || !password || !user.password) {
    return { success: false, error: 'Invalid credentials' };
  }

  // if (!user.emailVerified) {
  //   return { success: false, error: 'Email not verified' };
  // }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: LOGIN_REDIRECT
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, error: 'Invalid credentials' };
        default:
          return { success: false, error: 'Something went wrong' };
      }
    }
  }
};
