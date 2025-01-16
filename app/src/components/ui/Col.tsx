import { ColProps } from '@/types';
import React from 'react';

const calculateWidth = (span: number) => {
  if (!span) return '';
  const bp: { [key: number]: string } = {
    0: 'hidden',
    4: 'w-1/24',
    8: 'w-2/24',
    12: 'w-3/24',
    16: 'w-4/24',
    20: 'w-5/24',
    25: 'w-6/24',
    29: 'w-7/24',
    33: 'w-8/24',
    37: 'w-9/24',
    41: 'w-10/24',
    45: 'w-11/24',
    50: 'w-12/2',
    54: 'w-13/24',
    58: 'w-14/24',
    62: 'w-15/24',
    66: 'w-16/24',
    70: 'w-17/24',
    75: 'w-18/24',
    79: 'w-19/24',
    83: 'w-20/24',
    87: 'w-21/24',
    91: 'w-22/4',
    95: 'w-23/24',
    100: 'w-full',
  };

  const percentage = (span / 24) * 100;

  const validWidth = Math.floor(percentage);
  console.log(validWidth);

  return bp[validWidth] || '';
};

const Col: React.FC<ColProps> = ({
  span,
  offset = 0,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  className = '',
  children,
  gutterHorizontal,
  gutterVertical,
  ...props
}) => {
  // Generar clases de ancho basadas en `span`
  const widthClass = calculateWidth(span || 0);

  // Generar clases de desplazamiento (offset)
  const offsetClass = offset ? `ml-${(offset / 24) * 100}` : '';

  // Clases responsivas calculadas para cada breakpoint
  const responsiveClasses = [
    xs ? `xs:${calculateWidth(xs)}` : '',
    sm ? `sm:${calculateWidth(sm)}` : '',
    md ? `md:${calculateWidth(md)}` : '',
    lg ? `lg:${calculateWidth(lg)}` : '',
    xl ? `xl:${calculateWidth(xl)}` : '',
    xxl ? `2xl:${calculateWidth(xxl)}` : '',
  ]
    .filter(Boolean) // Filtrar clases vacías
    .join(' '); // Unirlas con espacios

  console.log({
    widthClass,
    responsiveClasses,
  });

  // Combinar todas las clases en el `div`
  const finalClassName = `
    ${widthClass} 
    ${offsetClass} 
    ${responsiveClasses} 
    ${className}
    ${gutterHorizontal ? `px-${gutterHorizontal / 4}` : ''}
    ${gutterVertical ? `py-${gutterVertical / 4}` : ''}
  `.trim();

  console.log(finalClassName);

  return (
    <div className={finalClassName} {...props}>
      {children}
    </div>
  );
};

export default Col;
