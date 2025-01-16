import React from 'react';
import { Gutter, RowProps } from '@/types';

const parseGutter = (gutter?: Gutter) => {
  if (Array.isArray(gutter)) {
    return {
      horizontal: gutter[0],
      vertical: gutter[1],
    };
  }
  return {
    horizontal: gutter || 0,
    vertical: gutter || 0,
  };
};

const Row: React.FC<RowProps> = ({
  gutter = 0,
  justify = 'start',
  align = 'top',
  className = '',
  children,
  ...props
}) => {
  const { horizontal, vertical } = parseGutter(gutter);
  const justifyClass = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    'space-around': 'justify-around',
    'space-between': 'justify-between',
    'space-evenly': 'justify-evenly',
  }[justify];

  const alignClass = {
    top: 'items-start',
    middle: 'items-center',
    bottom: 'items-end',
  }[align];

  return (
    <div
      className={`
        flex 
        flex-wrap 
        ${justifyClass} 
        ${alignClass} 
        -mx-${horizontal / 4} 
        -my-${vertical / 4} 
        ${className}
      `.trim()}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, {
          gutterHorizontal: horizontal,
          gutterVertical: vertical,
        }),
      )}
    </div>
  );
};

export default Row;
