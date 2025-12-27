'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { getUserById } from '@/lib/user';
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

  await db.user.update({
    where: { id: userId },
    data: { ...validatedFields.data }
  });

  return { success: 'User profile details updated!' };
};
