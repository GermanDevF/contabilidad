import { Input, Form, Button, showNotification } from '@/components/ui';
import { registerSchema } from '@/models/auth'; // Tipos de datos para el registro
import { RegisterFormValues } from '@/types';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from '@heroicons/react/24/solid';
import { registerApi } from '@/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '@/store/slices';
import { RegisterContainer } from './components';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterFormValues) => {
    dispatch(setLoading(true));
    const response = await registerApi(data);
    if (response.success) {
      showNotification(response.message, 'success');
      navigate('/login');
    }
    dispatch(setLoading(false));
  };

  return (
    <RegisterContainer>
      <Form
        className="w-full max-w-md"
        schema={registerSchema}
        onSubmit={handleRegister}
      >
        <Form.Item name="name" label="Nombre completo" hasFeedback>
          <Input allowClear prefix={<UserIcon className="icon" />} />
        </Form.Item>
        <Form.Item name="email" label="Correo electrónico" hasFeedback>
          <Input allowClear prefix={<EnvelopeIcon className="icon" />} />
        </Form.Item>
        <Form.Item name="password" label="Contraseña" hasFeedback>
          <Input.Password
            allowClear
            prefix={<LockClosedIcon className="icon" />}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirmar contraseña"
          hasFeedback
        >
          <Input.Password
            allowClear
            prefix={<LockClosedIcon className="icon" />}
          />
        </Form.Item>
        <Button variant="primary" htmlType="submit">
          Registrarse
        </Button>
      </Form>
    </RegisterContainer>
  );
};

export default RegisterForm;
