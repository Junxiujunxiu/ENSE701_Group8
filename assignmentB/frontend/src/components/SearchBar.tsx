import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 flex-grow"
        placeholder="Search SE methods..."
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white p-2">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
