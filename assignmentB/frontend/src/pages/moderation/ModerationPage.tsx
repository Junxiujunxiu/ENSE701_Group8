// src/pages/moderation/index.tsx

import { useEffect, useState } from 'react';
import { Article } from '../../components/Article';  // Adjust the import path if needed
import { ArticleDetail } from '@/components/articleDetails/articleDetails';
import axios from 'axios';

const ModerationPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null); // State for selected article
  const [detailLoading, setDetailLoading] = useState(false); // State for loading the article details
  const [similarArticles, setSimilarArticles] = useState<Article[]>([]); 
  const [comparingArticle, setComparingArticle] = useState<Article | null>(null); 
  
  useEffect(() => {
    // Fetch pending articles from the backend
    fetch('http://localhost:3001/api/moderation')
      .then((res) => res.json())
      .then((data) => {
        const articlesWithId = data.map((article: any) => ({
          id: article._id,  // Map _id to id for consistency
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
  }, []);
  
  const handleModeration = (id: string, status: 'moderated' | 'rejected') => {
    // Update the article's moderation status
    fetch(`http://localhost:3001/api/moderation/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
      .then(() => {
        setArticles(articles.filter((article) => article.id !== id));
      })
      .catch((err) => console.error('Error updating moderation status:', err));
  }; 

  /* const handleModeration = async (id: string, status: 'moderated' | 'rejected') => {
    try {
      const selectedArticle = articles.find((article) => article.id === id);
  
      if (!selectedArticle) {
        throw new Error('Article not found');
      }
  
      // Include the article details in the moderation request
      const moderationPayload = {
        status,
        sePractice: selectedArticle.sePractice,  // Include extra fields
        researchType: selectedArticle.researchType,
        peerReviewed: selectedArticle.peerReviewed,
        publicationType: selectedArticle.publicationType,
      };
  
      await fetch(`http://localhost:3001/api/moderation/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moderationPayload),
      });
  
      // Remove the article from the moderation list after approval/rejection
      setArticles(articles.filter((article) => article.id !== id));
  
      // Navigate to the analysis page if the article is approved
      //if (status === 'moderated') {
      //  window.location.href = `/analysis/${id}`;  // Redirect to the analysis page with the article ID
      //}
  
    } catch (err) {
      console.error('Error updating moderation status:', err);
    }
  }; */
  



  const handleCheck = (id: string) => {
    setDetailLoading(true); // Start loading
    // Fetch article details from the backend by article ID
    fetch(`http://localhost:3001/api/articles/${id}`)
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
          //add more details here when fetching the article details
          sePractice: data.sePractice,
          researchType: data.researchType,
          peerReviewed: data.peerReviewed,
          publicationType: data.publicationType,
        });
        console.log("Checking this article detail:", data);
        setDetailLoading(false); // Stop loading
      })
      .catch((err) => {
        console.error('Error fetching article details:', err);
        setDetailLoading(false);
      });
  };

  const handleUpdate = (updatedArticle: Article) => {
    // Extract the relevant fields to match the `CreateArticleDto` structure
    const updatePayload = {
      sePractice: updatedArticle.sePractice,
      researchType: updatedArticle.researchType,
      peerReviewed: updatedArticle.peerReviewed,
      publicationType: updatedArticle.publicationType,
    };
  
    axios
      .put(`http://localhost:3001/api/articles/${updatedArticle.id}`, updatePayload)
      .then((response) => {
        if (response.status === 200) {
          setSelectedArticle(null); // Close the detail window after a successful update
          console.log('Article updated successfully:', response.data);
        } else {
          console.error('Failed to update article. Status:', response.status);
        }
      })
      .catch((err) => {
        console.error('Error updating article:', err);
      });
  };

  // to precess comparison article function
  const handleCompare = async (article: Article) => {
    setDetailLoading(true);
  
    // get article info through article.id
    try {
      const response = await fetch(`http://localhost:3001/api/articles/${article.id}`);
      const data = await response.json();
  
      // save the article info into articleForComparison
      const articleForComparison = {
        id: article.id,
        title: data.title,
        authors: data.authors,
        doi: data.doi,
        status: data.status,
        claim: data.claim,
        evidence: data.evidence,
      };
  
      // post to compare article
      const comparisonResponse = await axios.post('http://localhost:3001/api/moderation/compare', articleForComparison);
      console.log('Comparison response:', comparisonResponse.data);

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
                    onClick={() => handleCheck(article.id!)} // Check button logic
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
      {/* Conditionally render ArticleDetail when an article is selected */}
      {selectedArticle && (
        <ArticleDetail 
          article={selectedArticle} 
          onClose={() => setSelectedArticle(null)}  // Close the window by setting article to null
          onUpdate={handleUpdate}  // Pass handleUpdate function 
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
