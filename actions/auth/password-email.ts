'use server';

import {
  PasswordEmailSchemaType,
  PasswordEmailSchema
} from '@/schemas/PasswordEmailSchema';
import { getUserByEmail } from '@/lib/user';
import {
  generatePasswordResetToken,
  sendPasswordResetEmail
} from '@/lib/passwordResetToken';

export const passwordEmail = async (formData: PasswordEmailSchemaType) => {
  const validateFields = PasswordEmailSchema.safeParse(formData);

  if (!validateFields.success) {
    return { success: false, error: 'Invalid Email' };
  }

  const { email } = validateFields.data;

  const user = await getUserByEmail(email);

  if (!user || !user.email) {
    return { success: false, error: 'No account found with that email' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  const { error } = await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  if (error) {
    return { success: false, error: 'Failed to send password reset email' };
  }

  return {
    success: 'Password reset link sent to your email address'
  };
};
