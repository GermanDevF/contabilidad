import React, { useRef, useState } from 'react';
import {
  useForm,
  FormProvider,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import {
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormItemProps, FormProps } from '@/types';
import {
  createValidationConfig,
  findRequiredRule,
  generateClassName,
} from './utils';

const Form = <TFormValues extends FieldValues>({
  onSubmit,
  children,
  schema,
  defaultValues,
  className = '',
  trigger = 'onChange',
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
    reValidateMode: trigger,
    mode: trigger,
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-2 ${className}`}
      >
        {children}
      </form>
    </FormProvider>
  );
};

// Form.Item
export const Item = ({
  name,
  label,
  children,
  hasFeedback = false,
  rules = [],
}: FormItemProps) => {
  const {
    register,
    resetField,
    watch,
    formState: { errors },
  } = useFormContext();

  const requiredRule = findRequiredRule(rules);
  const validationConfig = createValidationConfig({ rules, watch });
  const child = React.Children.only(children) as React.ReactElement;
  const value = watch(name);

  const {
    onChange: injectedOnChange,
    onBlur,
    ref,
    ...validationProps
  } = register(name, validationConfig);

  const _className = generateClassName({
    child,
    hasFeedback,
    errors,
    name,
    value,
    required: requiredRule?.required,
  });

  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
    if (inputRef.current) {
      inputRef.current.type = showPassword ? 'password' : 'text';
    }
  };

  const isPasswordField = name === 'password';

  // Clonamos el hijo y le pasamos las propiedades de React Hook Form
  const childWithRegister = React.cloneElement(child, {
    handleReset: () => {
      if (inputRef.current && isPasswordField) {
        setShowPassword(false);
        inputRef.current.type = 'password';
      }
      resetField(name);
    },
    id: name,
    ref: (el: HTMLInputElement) => {
      inputRef.current = el; // Asignamos la referencia
      if (typeof ref === 'function') ref(el);
    },
    value,
    ...validationProps,
    onBlur,
    injectedOnChange, // Usamos un nombre claro para la inyección de onChange
    hasFeedback,
    className: _className,
  });

  const errorMessage = errors[name]?.message as string;

  return (
    <div className="w-full">
      <label htmlFor={name} className="text-lg font-medium flex">
        {label}
        {isPasswordField && value && (
          <div
            className="text-gray-500 flex items-center hover:text-gray-700 cursor-pointer ml-2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-4 h-4" />
            ) : (
              <EyeIcon className="w-4 h-4" />
            )}
          </div>
        )}
        {requiredRule && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      <div className="relative">
        {childWithRegister}
        {hasFeedback && !errorMessage && value && (
          <CheckCircleIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
        )}
        {hasFeedback && errorMessage && (
          <XCircleIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
        )}
      </div>
      <p className="text-red-500 text-sm min-h-6 ">{errorMessage}</p>
    </div>
  );
};

Form.Item = Item;

export default Form;
