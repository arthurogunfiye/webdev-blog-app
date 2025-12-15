import db from './db';
import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    // Check for existing token
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email }
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    // Check for existing token
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token }
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  // Generate token and expiration time
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 900 * 1000); // 15 minutes

  // Check for existing token
  const existingToken = await getPasswordResetTokenByEmail(email);

  // Delete existing token if any
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id }
    });
  }

  // Create new token
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires
    }
  });

  return passwordResetToken;
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  // Create verification link
  const passwordResetLink = `${process.env.BASE_URL}/password-reset-form?token=${token}`;

  // Send email
  const response = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'ayodejiadefuye@gmail.com',
    subject: 'Password Reset Request',
    html: `<p>Please reset your password by clicking this <a href=${passwordResetLink}>link</a></p>`
  });

  return { error: response.error };
};
