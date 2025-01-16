import React from 'react';

const Row = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full grid grid-cols-24 gap-4">{children}</div>;
};

export default Row;
