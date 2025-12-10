import { FaGithub, FaGoogle } from 'react-icons/fa';
import Button from '../common/Button';
import { signIn } from 'next-auth/react';
import { LOGIN_REDIRECT } from '@/routes';

const SocialAuth = () => {
  const handleSocialAuth = (provider: 'google' | 'github') => {
    signIn(provider, {
      redirectTo: LOGIN_REDIRECT
    });
  };

  return (
    <div className='flex flex-col justify-center gap-2 md:flex-row'>
      <Button
        type='button'
        label='Continue with Google'
        outline
        icon={FaGoogle}
        onClick={() => handleSocialAuth('google')}
      />
      <Button
        type='button'
        label='Continue with GitHub'
        outline
        icon={FaGithub}
        onClick={() => handleSocialAuth('github')}
      />
    </div>
  );
};

export default SocialAuth;
