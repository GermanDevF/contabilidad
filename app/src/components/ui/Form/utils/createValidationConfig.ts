import { FormRule, ValidationConfig } from '@/types';

type CreateValidationConfig = {
  rules: FormRule[];
  watch: () => Record<string, unknown>;
};

export const createValidationConfig = ({
  rules,
  watch,
}: CreateValidationConfig) => {
  if (!rules.length) {
    return {};
  }

  const validationConfig: ValidationConfig = rules.reduce(
    (config, rule) => {
      if (rule.required) {
        config.required = rule.message || 'Este campo es obligatorio';
      }
      if (rule.pattern) {
        config.pattern = {
          value: rule.pattern,
          message: rule.message || 'El formato no es válido',
        };
      }
      if (rule.maxLength) {
        config.maxLength = {
          value: rule.maxLength,
          message:
            rule.message ||
            `Debe tener como máximo ${rule.maxLength} caracteres`,
        };
      }
      if (rule.minLength) {
        config.minLength = {
          value: rule.minLength,
          message:
            rule.message || `Debe tener al menos ${rule.minLength} caracteres`,
        };
      }
      if (rule.validator) {
        // Si ya existe una propiedad validate, la combinamos con el nuevo validator
        const currentValidate = config.validate;
        config.validate = async (value: string) => {
          try {
            if (currentValidate) {
              const result = await (typeof currentValidate === 'function'
                ? currentValidate(value, watch())
                : Promise.all(
                    Object.values(currentValidate).map((validateFn) =>
                      validateFn(value, watch()),
                    ),
                  ).then((results) => results.every((res) => res === true)));

              if (result !== true) {
                return typeof result === 'string'
                  ? result
                  : 'Error en la validación'; // Aseguramos que el error sea un string
              }
            }
            // Ejecuta el nuevo validator y asegura el tipo de retorno
            const validationResult = await rule.validator?.(value);
            if (validationResult) return true;
            return typeof validationResult === 'string'
              ? validationResult
              : 'Error en la validación'; // Convertimos cualquier valor inesperado a un string
          } catch (error) {
            // Si el validator lanza un error, lo capturamos y devolvemos como mensaje
            return error instanceof Error ? error.message : 'Error desconocido';
          }
        };
      }

      return config;
    },
    {} as ValidationConfig, // Tipo explícito basado en React Hook Form
  );

  return validationConfig;
};
