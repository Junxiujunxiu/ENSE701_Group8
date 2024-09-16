import { useState } from 'react';
import { Article } from '../../components/Article'; // Ensure the path is correct

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    fetch('http://localhost:3001/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: query }) // Send as an object with the key 'title'
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
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Articles</h1>
      <input
        type="text"
        value={query || ''}  // Ensure `query` has a defined value (empty string if undefined)
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full mb-4"
        placeholder="Enter search term..."
      />

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Search
      </button>
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
                  <tr key={article._id || article.id}> {/* Use _id if available */}
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
