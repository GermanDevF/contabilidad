import { ReactNode } from 'react';
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  RegisterOptions,
} from 'react-hook-form';
import { Schema } from 'zod';
// region Button Types
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'neutral';

export type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  htmlType?: 'button' | 'submit' | 'reset';
};

// region Route Types
export type RouteType = 'link' | 'button';
export type RouteVariant = 'primary' | 'secondary';

export type Route = {
  label: string;
  path?: string;
  type: RouteType;
  variant?: RouteVariant;
  onClick?: () => void;
};

// region Form Types
export type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: ReactNode;
  schema?: Schema | undefined;
  defaultValues?: DefaultValues<TFormValues>;
  className?: string;
  trigger?: 'onSubmit' | 'onChange' | 'onBlur';
};

// region FormItem Types
export type ValidationConfig = RegisterOptions;
export interface FormRule {
  required?: boolean; // Campo obligatorio
  message?: string; // Mensaje de error
  pattern?: RegExp; // Expresión regular
  maxLength?: number; // Longitud máxima
  minLength?: number; // Longitud mínima
  validator?: (value: string) => boolean | Error; // Validador personalizado
  [key: string]: unknown; // Otras reglas adicionales
}

export type FormItemProps = {
  name: string;
  label: string;
  children: ReactNode;
  hasFeedback?: boolean;
  rules?: FormRule[];
};

// region Row Types
export type Gutter = number | [number, number];

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: Gutter;
  justify?:
    | 'start'
    | 'end'
    | 'center'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  align?: 'top' | 'middle' | 'bottom';
  className?: string;
  children: React.ReactNode;
}

// region Col Types
export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number;
  offset?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  gutterHorizontal?: number;
  gutterVertical?: number;
  className?: string;
  children: React.ReactNode;
}
// region Input Types
export interface InputProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  injectedOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  allowClear?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  value?: string;
  handleReset?: () => void;
  className?: string;
  hasFeedback?: boolean;
}
