// src/components/SearchBar/SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
  previousSearches: string[];
  onPreviousSearchClick: (searchTerm: string) => void;
  onClearSearchHistory: () => void; // Prop to clear search history
  onFilter: () => void; // Prop for the filter action
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  setQuery,
  onSearch,
  previousSearches,
  onPreviousSearchClick,
  onClearSearchHistory,
  onFilter, // Destructure the filter prop
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="search-input p-2 border rounded"
      />
      <button onClick={onSearch} className="search-button p-2 bg-gray-300 rounded">
        Search
      </button>
      <button onClick={onFilter} className="filter-button p-2 bg-blue-300 rounded ml-2">
        Filter
      </button>
      <button onClick={onClearSearchHistory} className="clear-history-button p-2 bg-red-500 text-white rounded mt-2 ml-2">
        Clear Search History
      </button>

      {previousSearches.length > 0 && (
        <div className="previous-searches mt-4">
          <h2 className="text-lg font-bold">Previous Searches:</h2>
          <ul className="list-disc pl-5">
            {previousSearches.map((search, index) => (
              <li
                key={index}
                onClick={() => onPreviousSearchClick(search)}
                className="cursor-pointer text-blue-500 hover:underline"
              >
                {search}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
