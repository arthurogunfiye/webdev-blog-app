import { FaGithub, FaGoogle } from 'react-icons/fa';
import Button from '../common/Button';

const SocialAuth = () => {
  return (
    <div className='flex flex-col justify-center gap-2 md:flex-row'>
      <Button
        type='button'
        label='Continue with Google'
        outline
        icon={FaGoogle}
        onClick={() => {}}
      />
      <Button
        type='button'
        label='Continue with GitHub'
        outline
        icon={FaGithub}
        onClick={() => {}}
      />
    </div>
  );
};

export default SocialAuth;
