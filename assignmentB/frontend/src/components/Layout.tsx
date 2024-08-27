import React from 'react';
import Link from 'next/link';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl">Software Empirical Evidence Database (SPEED)</h1>
        <nav className="mt-2">
          <Link href="/" className="mr-4">Home</Link>
          <Link href="/search" className="mr-4">Search</Link>
          <Link href="/submit" className="mr-4">Submit</Link>
          <Link href="/moderation" className="mr-4">Moderation</Link>
          <Link href="/analysis">Analysis</Link>
        </nav>
      </header>
      <main className="flex-grow p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 SPEED Project</p>
      </footer>
    </div>
  );
};

export default Layout;
