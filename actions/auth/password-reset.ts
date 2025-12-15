'use server';

import db from '@/lib/db';
import { getPasswordResetTokenByToken } from '@/lib/passwordResetToken';
import { getUserByEmail } from '@/lib/user';
import {
  PasswordResetSchemaType,
  PasswordResetSchema
} from '@/schemas/PasswordResetSchema';
import bcrypt from 'bcryptjs';

export const passwordReset = async (
  formData: PasswordResetSchemaType,
  token?: string | null
) => {
  if (!token) {
    return { error: 'Token does not exist!' };
  }

  const validatedData = PasswordResetSchema.safeParse(formData);

  if (!validatedData.success) {
    return { error: 'Invalid Password!' };
  }

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: 'Invalid or expired token!' };
  }

  const isTokenExpired = new Date(existingToken.expires) < new Date();

  if (isTokenExpired) {
    return { error: 'Token has expired!' };
  }

  const user = await getUserByEmail(existingToken.email);

  if (!user) {
    return { error: 'User not found!' };
  }

  const { password } = validatedData.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      emailVerified: new Date(),
      email: existingToken.email
    }
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id }
  });

  return { success: 'Password has been reset successfully!' };
};
