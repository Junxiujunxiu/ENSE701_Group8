import React, { useEffect, useState } from 'react';
import { Article } from '../../components/Article'; // Adjust the import path

const AdminPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Use the dynamic API URL from environment variables
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3001';

  useEffect(() => {
    // Fetch articles from the admin API using the dynamic URL
    fetch(`${apiUrl}/api/admin`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch articles');
        }
        return res.json();
      })
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching articles:', err);
        setLoading(false);
      });
  }, [apiUrl]);

  const handleDelete = (id?: string) => {
    if (!id) {
      console.error('No ID provided for deletion');
      return;
    }

    if (window.confirm('Are you sure you want to delete this article?')) {
      // Send a DELETE request using the dynamic API URL
      fetch(`${apiUrl}/api/admin/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          setArticles(articles.filter((article) => article.id !== id));
        })
        .catch((err) => console.error('Error deleting article:', err));
    }
  };

  if (loading) return <div>Loading articles...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {articles.length === 0 ? (
        <p>No articles to display.</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article._id || article.id}>
                <td>{article.title}</td>
                <td>{article.authors.join(', ')}</td>
                <td>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(article._id || article.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;
