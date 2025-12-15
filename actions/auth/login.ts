'use server';

import { signIn } from '@/auth';
import {
  generateEmailVerificationToken,
  sendEmailVerificationToken
} from '@/lib/emailVerification';
import { getUserByEmail } from '@/lib/user';
import { LOGIN_REDIRECT } from '@/routes';
import { LoginSchema, LoginSchemaType } from '@/schemas/LoginSchema';
import { AuthError } from 'next-auth';

export const login = async (formData: LoginSchemaType) => {
  const validateFields = LoginSchema.safeParse(formData);

  // Validate input fields
  if (!validateFields.success) {
    return { success: false, error: 'Invalid fields!' };
  }

  const { email, password } = validateFields.data;

  // Get user by email
  const user = await getUserByEmail(email);

  // Check if user exists and has password
  if (!user || !email || !password || !user.password) {
    return { success: false, error: 'Invalid credentials' };
  }

  // Check if email is verified
  if (!user.emailVerified) {
    const emailVerificationToken = await generateEmailVerificationToken(
      user.email
    );

    const { error } = await sendEmailVerificationToken(
      emailVerificationToken.email,
      emailVerificationToken.token
    );

    if (error) {
      return {
        error:
          'Failed to send verification email. Try to login to resend the verification email!'
      };
    }

    return { success: 'Verification email sent!' };
  }

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
