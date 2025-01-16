import { FieldErrors, FieldValues } from 'react-hook-form';

type GenerateClassNameProps = {
  child: React.ReactElement;
  hasFeedback: boolean;
  errors: FieldErrors<FieldValues>;
  name: string;
  value?: string;
  required?: boolean;
};

export const generateClassName = (props: GenerateClassNameProps) => {
  const { child, hasFeedback, errors, name, value, required } = props;
  let output = child?.props?.className || '';
  if (hasFeedback && !errors[name] && value) {
    output += ' border-green-500 focus:ring-green-500';
  }
  if ((errors[name] && hasFeedback) || (required && !value)) {
    output += ' border-red-500 focus:ring-red-500';
  }

  return output.trim().replace(/undefined/gi, '');
};
