import React from 'react';

const LoginContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 md:min-h-[85vh] min-h-[75vh] bg-transparent">
      <div className="w-full max-w-md bg-white p-4 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>
        {children}
      </div>
    </div>
  );
};

export default LoginContainer;
