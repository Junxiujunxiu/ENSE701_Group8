import { useState, useEffect } from 'react';
import { Article } from '../../components/Article';
import Cookies from 'js-cookie';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState('title'); // Default filter
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);

  useEffect(() => {
    // Load previous searches from cookies
    const savedSearches = JSON.parse(Cookies.get('searchHistory') || '[]');
    setPreviousSearches(savedSearches);
  }, []);

  const handleSearch = () => {
    if (!query) return; // Prevent empty searches

    setLoading(true);

    // Update previous searches
    const updatedSearches = JSON.parse(Cookies.get('searchHistory') || '[]');
    if (!updatedSearches.includes(query)) {
      updatedSearches.push(query);
      Cookies.set('searchHistory', JSON.stringify(updatedSearches), { expires: 7 });
      setPreviousSearches(updatedSearches);
    }

    fetch('http://localhost:3001/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: query,
        filterBy: filterBy // Include filter in the search request
      })
    })
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error searching articles:', err);
        setLoading(false);
      });
  };

  const handleClear = () => {
    setQuery('');
    setArticles([]);
  };

  const handleClearSearchHistory = () => {
    setPreviousSearches([]);
    Cookies.remove('searchHistory'); // Clear cookies
  };

  const handlePreviousSearchClick = (searchTerm: string) => {
    setQuery(searchTerm);
    handleSearch();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Search Articles</h1>
      
      <div className="search-container flex flex-col items-center mb-4">
        <div className="search-bar-wrapper flex justify-center items-center mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input p-2 border rounded mr-2"
            placeholder="Enter article title to search..."
          />
          <button onClick={handleSearch} className="search-button p-2 bg-gray-300 rounded">
            Search
          </button>
          <button onClick={handleClear} className="clear-button p-2 bg-gray-300 rounded ml-2">
            Clear
          </button>
        </div>

        <div className="filter-container">
          <label htmlFor="filter-select" className="mr-2">Filter by:</label>
          <select
            id="filter-select"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="filter-select p-2 border rounded"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="popularity">Popularity</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>

      {previousSearches.length > 0 && (
  <div className="previous-searches mt-4">
    <h2 className="text-lg font-bold">Previous Searches:</h2>
    <ul className="list-disc pl-5">
      {previousSearches.slice().reverse().map((search, index) => (
        <li
          key={index}
          onClick={() => handlePreviousSearchClick(search)}
          className="cursor-pointer text-blue-500 hover:underline"
        >
          {search}
        </li>
      ))}
    </ul>
    <button onClick={handleClearSearchHistory} className="clear-history-button p-2 bg-red-500 text-white rounded mt-2">
      Clear History
    </button>
  </div>
)}
      {loading ? <div>Loading...</div> : (
        articles.length > 0 ? (
          <table className="table-auto w-full mt-4">
            <thead>
              <tr>
                <th>Title</th>
                <th>Authors</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(article => (
                <tr key={article._id || article.id}>
                  <td>{article.title}</td>
                  <td>{article.authors.join(', ')}</td>
                  <td>{article.pubyear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
