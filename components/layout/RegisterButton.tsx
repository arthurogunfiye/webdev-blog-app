'use client';

import { useRouter } from 'next/navigation';

const RegisterButton = () => {
  const router = useRouter();
  return <button onClick={() => router.push('/register')}>Register</button>;
};

export default RegisterButton;

// The useRouter hook is used here to programmatically navigate to the register page when the button is clicked.
