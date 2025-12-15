import db from './db';
import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    // Check for existing token
    const verificationToken = await db.emailVerificationToken.findFirst({
      where: { email }
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  // Generate token and expiration time
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour from now

  // Check for existing token
  const existingToken = await getVerificationTokenByEmail(email);

  // Delete existing token if any
  if (existingToken) {
    await db.emailVerificationToken.delete({
      where: { id: existingToken.id }
    });
  }

  // Create new token
  const emailVerificationToken = await db.emailVerificationToken.create({
    data: {
      email,
      token,
      expires
    }
  });

  return emailVerificationToken;
};

export const sendEmailVerificationToken = async (
  email: string,
  token: string
) => {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  // Create verification link
  const emailVerificationLink = `${process.env.BASE_URL}/email-verification?token=${token}`;

  // Send email
  const response = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'ayodejiadefuye@gmail.com',
    subject: 'Verify your email address',
    html: `<p>Please verify your email by clicking this <a href=${emailVerificationLink}>link</a></p>`
  });

  return { error: response.error };
};
