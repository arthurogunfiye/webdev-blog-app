'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { verifyEmail } from '@/actions/auth/email-verification';
import Heading from '../common/Heading';
import Alert from '../common/Alert';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';

const EmailVerificationClient = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, setIsPending] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setIsPending(true);
    if (!token) return setError('No verification token provided');
    verifyEmail(token).then(response => {
      setSuccess(response.success);
      setError(response.error);
    });
    setIsPending(false);
  }, [token]);

  return (
    <div className={bannerStyleClasses}>
      <Heading title='WEBDEV.blog' center />
      {isPending && <div>Verifying your email...</div>}
      {success && <Alert message={success} success />}
      {error && <Alert message={error} error />}
      {success && (
        <Button
          type='submit'
          label='Login'
          onClick={() => router.push('/login')}
        />
      )}
    </div>
  );
};

export default EmailVerificationClient;

const bannerStyleClasses =
  'border-2 rounded-md p-2 flex flex-col gap-2 items-center my-8 max-w-[400px] mx-auto';
