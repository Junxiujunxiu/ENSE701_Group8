import React from 'react';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl">Software Empirical Evidence Database (SPEED)</h1>
      </header>
      <main className="flex-grow p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 SPEED Project</p>
      </footer>
    </div>
  );
};

export default Layout;
