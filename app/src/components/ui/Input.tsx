import React, { forwardRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { InputProps } from '@/types';

// Usamos forwardRef para pasar el ref al input
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      injectedOnChange,
      onChange, // onChange opcional para personalizaciones
      allowClear = false,
      prefix,
      suffix,
      value = '',
      className = '',
      handleReset,
      hasFeedback,
      ...props
    }: InputProps,
    ref,
  ) => {
    const handleClear = () => {
      handleReset?.(); // Llamamos al reset inyectado desde Form.Item
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      injectedOnChange?.(event); // RHF inyecta este evento
      if (onChange) {
        onChange(event);
      } // Ejecutamos cualquier lógica adicional
    };

    const inputClasses = `pl-10 pr-10 py-2 w-full rounded-md focus:outline-none ${className}`;

    return (
      <div
        className={`relative flex items-center border rounded-md focus:ring-1 ${className}`}
      >
        {prefix && (
          <div className="absolute left-3 text-gray-500">{prefix}</div>
        )}

        <input
          ref={ref}
          type="text"
          onChange={handleChange}
          className={inputClasses}
          {...props}
        />

        {allowClear && value && (
          <div
            className={`absolute ${hasFeedback ? 'right-6' : 'right-2'} cursor-pointer`}
            onClick={handleClear}
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </div>
        )}

        {suffix && (
          <div className="absolute right-3 text-gray-500">{suffix}</div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input'; // Es recomendable agregar un nombre de display para debugging

// Componente Password
const Password = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      injectedOnChange,
      onChange,
      allowClear = false,
      prefix,
      suffix,
      value = '',
      className = '',
      handleReset,
      hasFeedback,
      ...props
    }: InputProps,
    ref,
  ) => {
    const handleClear = () => {
      handleReset?.();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      injectedOnChange?.(event);
      if (onChange) {
        onChange(event);
      }
    };

    const inputClasses = `pl-10 pr-10 py-2 w-full rounded-md focus:outline-none ${className}`;

    return (
      <div
        className={`relative flex items-center border rounded-md focus:ring-1 ${className}`}
      >
        {prefix && (
          <div className="absolute left-3 text-gray-500">{prefix}</div>
        )}

        <input
          ref={ref}
          type="password"
          onChange={handleChange}
          className={inputClasses}
          {...props}
        />

        {allowClear && value && (
          <div
            className={`absolute ${hasFeedback ? 'right-6' : 'right-2'} cursor-pointer`}
            onClick={handleClear}
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </div>
        )}

        {suffix && (
          <div className="absolute right-3 text-gray-500">{suffix}</div>
        )}
      </div>
    );
  },
);

Password.displayName = 'Password';

// Establecer Password como propiedad de Input
type InputWithPassword = React.FC<InputProps> & {
  Password: React.FC<InputProps>;
};

const InputWithPassword = Input as unknown as InputWithPassword;
InputWithPassword.Password = Password;

// Agregar Password como propiedad estática de Input

export default InputWithPassword;
