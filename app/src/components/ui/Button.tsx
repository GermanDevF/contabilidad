import { ButtonProps } from '@/types/componentsTypes';

const Button = ({
  onClick,
  children,
  htmlType,
  className,
  variant = 'primary',
}: ButtonProps) => {
  const getButtonClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-white hover:bg-purple-600';
      case 'secondary':
        return 'bg-secondary text-white hover:bg-purple-500'; // Morado claro al pasar el ratón
      case 'success':
        return 'bg-success text-white hover:bg-green-600';
      case 'danger':
        return 'bg-danger text-white hover:bg-red-600';
      case 'neutral':
        return 'bg-neutral-100 text-black hover:bg-neutral-200';
      default:
        return 'bg-primary text-white hover:bg-purple-600';
    }
  };

  return (
    <button
      type={htmlType}
      onClick={onClick}
      className={`${getButtonClasses()} py-2 px-4 rounded-md transition-colors w-full ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
