'use server';

import bcrypt from 'bcryptjs';
import { RegisterSchema, RegisterSchemaType } from '@/schemas/RegisterSchema';
import db from '@/lib/db';
import { getUserByEmail } from '@/lib/user';
import {
  generateEmailVerificationToken,
  sendEmailVerificationToken
} from '@/lib/emailVerification';

export const signUp = async (formData: RegisterSchemaType) => {
  const validateFields = RegisterSchema.safeParse(formData);

  if (!validateFields.success) {
    return { success: false, error: 'Invalid fields!' };
  }

  const { name, email, password } = validateFields.data;

  const user = await getUserByEmail(email);

  if (user) {
    return { success: false, error: 'User already exists!' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: { name, email, password: hashedPassword }
  });

  const emailVerificationToken = await generateEmailVerificationToken(email);

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
};
