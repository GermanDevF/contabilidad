import { Input, Form, Button, showNotification } from '@/components/ui';
import { loginSchema } from '@/models/auth'; // Tipos de datos de autenticación
import { LoginFormValues } from '@/types';
import { LoginContainer } from './components';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { getUserData, loginApi } from '@/api';
import { useDispatch } from 'react-redux';
import { login, setToken } from '@/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { setLoading } from '@/store/slices';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (data: LoginFormValues) => {
    dispatch(setLoading(true));
    const response = await loginApi(data);
    if (response.success) {
      showNotification(response.message, 'success');
      dispatch(setToken(response.token));
      const userData = await getUserData();
      if (userData.success) {
        dispatch(login(userData.data));
        const redirect = new URLSearchParams(location.search).get('redirect');
        navigate(redirect || '/dashboard');
      }
    }
    dispatch(setLoading(false));
  };

  return (
    <LoginContainer>
      <Form
        className="w-full max-w-md"
        schema={loginSchema}
        onSubmit={handleLogin}
      >
        <Form.Item name="email" label="Correo electrónico" hasFeedback>
          <Input allowClear prefix={<EnvelopeIcon className="icon" />} />
        </Form.Item>
        <Form.Item name="password" label="Contraseña" hasFeedback>
          <Input.Password
            allowClear
            prefix={<LockClosedIcon className="icon" />}
          />
        </Form.Item>
        <Button variant="primary" htmlType="submit">
          Iniciar sesión
        </Button>
      </Form>
    </LoginContainer>
  );
};

export default LoginForm;
