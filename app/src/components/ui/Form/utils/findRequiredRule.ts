import { FormRule } from '@/types';

export const findRequiredRule = (rules: FormRule[]) => {
  return rules.find((rule) => rule.required);
};
