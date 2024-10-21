import { useState, useEffect } from 'react';
import { Article } from '../../components/Article';
import Cookies from 'js-cookie';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState('title'); // Default filter
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);
  
  // Use the dynamic API URL from environment variables
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3001';

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

    // Fetch from the dynamic API URL
    fetch(`${apiUrl}/api/search`, {
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
      {/* The rest of your JSX remains unchanged */}
    </div>
  );
};

export default SearchPage;
