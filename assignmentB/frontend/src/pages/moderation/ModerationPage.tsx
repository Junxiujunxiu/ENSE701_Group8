import { useEffect, useState } from 'react';
import { Article } from '../../components/Article';  // Adjust the import path if needed
import { ArticleDetail } from '@/components/articleDetails/articleDetails';
import axios from 'axios';

const ModerationPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [similarArticles, setSimilarArticles] = useState<Article[]>([]);
  const [comparingArticle, setComparingArticle] = useState<Article | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3001';
  
  useEffect(() => {
    // Fetch pending articles from the backend
    fetch(`${apiUrl}/api/moderation`)
      .then((res) => res.json())
      .then((data) => {
        const articlesWithId = data.map((article: any) => ({
          id: article._id,
          title: article.title,
          authors: article.authors,
          status: article.status,
        }));
        setArticles(articlesWithId);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching moderation articles:', err);
        setLoading(false);
      });
  }, [apiUrl]);  // Add apiUrl to the dependency array
  
  const handleModeration = (id: string, status: 'moderated' | 'rejected') => {
    fetch(`${apiUrl}/api/moderation/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
      .then(() => {
        setArticles(articles.filter((article) => article.id !== id));
      })
      .catch((err) => console.error('Error updating moderation status:', err));
  };

  const handleCheck = (id: string) => {
    setDetailLoading(true);
    fetch(`${apiUrl}/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedArticle({
          id: data._id,
          title: data.title,
          authors: data.authors,
          source: data.source,
          pubyear: data.pubyear,
          doi: data.doi,
          claim: data.claim,
          evidence: data.evidence,
          status: data.status,
          sePractice: data.sePractice,
          researchType: data.researchType,
          peerReviewed: data.peerReviewed,
          publicationType: data.publicationType,
        });
        setDetailLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching article details:', err);
        setDetailLoading(false);
      });
  };

  const handleUpdate = (updatedArticle: Article) => {
    const updatePayload = {
      sePractice: updatedArticle.sePractice,
      researchType: updatedArticle.researchType,
      peerReviewed: updatedArticle.peerReviewed,
      publicationType: updatedArticle.publicationType,
    };
  
    axios
      .put(`${apiUrl}/api/articles/${updatedArticle.id}`, updatePayload)
      .then((response) => {
        if (response.status === 200) {
          setSelectedArticle(null);
          console.log('Article updated successfully:', response.data);
        } else {
          console.error('Failed to update article. Status:', response.status);
        }
      })
      .catch((err) => {
        console.error('Error updating article:', err);
      });
  };

  const handleCompare = async (article: Article) => {
    setDetailLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/articles/${article.id}`);
      const data = await response.json();
  
      const articleForComparison = {
        id: article.id,
        title: data.title,
        authors: data.authors,
        doi: data.doi,
        status: data.status,
        claim: data.claim,
        evidence: data.evidence,
      };
  
      const comparisonResponse = await axios.post(`${apiUrl}/api/moderation/compare`, articleForComparison);
      setSimilarArticles(comparisonResponse.data);
      setComparingArticle(article);
    } catch (error) {
      console.error('Error during article comparison:', error);
    } finally {
      setDetailLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Moderation</h1>
      {articles.length === 0 ? (
        <p>No articles pending moderation.</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Actions</th>
              <th>Details</th>
              <th>Compare</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.authors.join(', ')}</td>
                <td>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleModeration(article.id!, 'moderated')}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleModeration(article.id!, 'rejected')}
                  >
                    Reject
                  </button>
                </td>
                <td>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleCheck(article.id!)}
                  >
                    Check
                  </button>
                </td>
                <td>
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => handleCompare(article)}
                  >
                    Compare
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedArticle && (
        <ArticleDetail
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onUpdate={handleUpdate}
        />
      )}
      {comparingArticle && (
        <div>
          <h2 className="text-xl font-bold mt-6">Comparison Results for: {comparingArticle.title}</h2>
          {similarArticles.length > 0 ? (
            <div>
              <p>Found {similarArticles.length} similar articles:</p>
              <ul className="list-disc pl-6">
                {similarArticles.map((similarArticle) => (
                  <li key={similarArticle.id}>
                    <strong>Title:</strong> {similarArticle.title} <br />
                    <strong>Authors:</strong> {similarArticle.authors.join(', ')} <br />
                    <strong>DOI:</strong> {similarArticle.doi} <br />
                    <strong>Status:</strong> {similarArticle.status}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No similar articles found in the database.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ModerationPage;
