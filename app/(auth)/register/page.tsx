import RegisterForm from '@/components/auth/RegisterForm';
import Container from '@/components/layout/Container';

const RegisterPage = async () => {
  return (
    <div>
      <Container>
        <RegisterForm />
      </Container>
    </div>
  );
};

export default RegisterPage;
