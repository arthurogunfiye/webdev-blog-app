'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import {
  generateEmailVerificationToken,
  sendEmailVerificationToken
} from '@/lib/emailVerification';
import { getUserByEmail, getUserById } from '@/lib/user';
import {
  EditProfileSchemaType,
  EditProfileSchema
} from '@/schemas/EditProfileSchema';
import { success } from 'zod';

export const editUser = async (
  values: EditProfileSchemaType,
  userId: string
) => {
  const validatedFields = EditProfileSchema.safeParse(values);

  if (!validatedFields.success) return { error: 'Invalid fields!' };

  const session = await auth();

  if (session?.user.userId !== userId)
    return { error: 'You are not authorised to edit this profile!' };

  const user = await getUserById(userId);

  if (!user) return { error: 'User does not exist!' };

  if (user.email !== validatedFields.data.email) {
    const isThisAnExistingUser = await getUserByEmail(
      validatedFields.data.email
    );

    if (isThisAnExistingUser) return { error: 'Email already in use!' };

    await db.user.update({
      where: { id: userId },
      data: {
        ...validatedFields.data,
        emailVerified: null
      }
    });

    const verificationToken = await generateEmailVerificationToken(
      validatedFields.data.email
    );

    const { error } = await sendEmailVerificationToken(
      verificationToken.email,
      verificationToken.token
    );

    if (error) {
      return {
        error:
          'Something went wrong while sending the verification email! Try to login to resend the verification email!'
      };
    }

    return { success: 'Verification email sent!' };
  } else {
    await db.user.update({
      where: { id: userId },
      data: { ...validatedFields.data }
    });

    return { success: 'User profile details updated!' };
  }
};
