import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h2 className="text-4xl mb-4">Welcome to SPEED</h2>
      <p className="text-lg mb-6">Search, submit, and analyze software engineering practices.</p>
      
      <div className="flex justify-center space-x-4">
        <Link href="/search" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Search Articles
        </Link>
        
        <Link href="/submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Submit Article
        </Link>
        
        <Link href="/moderation" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
          Moderate Submissions
        </Link>
        
        <Link href="/analysis" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Analyze Articles
        </Link>
      </div>
    </div>
  );
};

export default Home;
