import { useEffect, useState } from 'react';

/**
 * Hook personalizado para debouncing.
 * @template T - El tipo del valor que se está debouncing.
 * @param value - El valor a debouncing.
 * @param delay - El tiempo de retraso en milisegundos.
 * @returns El valor debounced después del retraso especificado.
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
