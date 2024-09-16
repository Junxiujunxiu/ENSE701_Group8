import { useEffect, useState } from 'react';
import { Article } from '../../components/Article'; // Adjust the import path accordingly

const AnalysisPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/analysis')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching analysis articles:', err);
        setLoading(false);
      });
  }, []);

  const handleAnalyze = (id: string | undefined) => {
    if (!id) {
      console.error('ID is undefined');
      return;
    }
    // Proceed with analyzing the article
    fetch(`http://localhost:3001/api/analysis/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'analyzed' }),
    })
      .then(() => {
        setArticles(articles.filter(article => article._id !== id));
      })
      .catch(err => console.error('Error analyzing article:', err));
  };
  
  

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Analysis</h1>
      {articles.length === 0 ? (
        <p>No articles awaiting analysis.</p>
      ) : (
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Status</th> {/* Add status column */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article._id || article.id}>
                <td>{article.title}</td>
                <td>{article.authors.join(', ')}</td>
                <td>{article.status}</td> {/* Show article status */}
                <td>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleAnalyze(article._id || article.id || '')}
                  >
                    Mark as Analyzed
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

export default AnalysisPage;
