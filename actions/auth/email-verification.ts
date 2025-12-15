'use server';

import db from '@/lib/db';
import { getUserByEmail } from '@/lib/user';

export const verifyEmail = async (token: string) => {
  // Find the token in the database
  const emailVerificationToken = await db.emailVerificationToken.findUnique({
    where: { token }
  });

  // If token not found, return error
  if (!emailVerificationToken) {
    return { error: 'Verification token does not exist!' };
  }

  // Check if token is expired
  const isTokenExpired = new Date(emailVerificationToken.expires) < new Date();

  // If token is expired, return error
  if (isTokenExpired) return { error: 'Verification token has expired!' };

  // Check if user exists
  const existingUser = await getUserByEmail(emailVerificationToken.email);

  // If user does not exist, return error
  if (!existingUser) return { error: 'User does not exist!' };

  // Verify user's email in the database
  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: emailVerificationToken.email }
  });

  return { success: 'Email verified successfully' };
};
