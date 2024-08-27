import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';

const Moderation: React.FC = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get('/api/articles/moderation');
      setArticles(response.data);
    };
    fetchArticles();
  }, []);

  const handleModerate = async (articleId: string, action: string) => {
    await axios.post(`/api/articles/moderate/${articleId}`, { action });
    setArticles(articles.filter(article => article.id !== articleId));
  };

  return (
    <div>
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article}>
          <button onClick={() => handleModerate(article.id, 'approve')}>Approve</button>
          <button onClick={() => handleModerate(article.id, 'reject')}>Reject</button>
        </ArticleCard>
      ))}
    </div>
  );
};

export default Moderation;
