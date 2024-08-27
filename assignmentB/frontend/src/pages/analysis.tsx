import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';

const Analysis: React.FC = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get('/api/articles/analysis');
      setArticles(response.data);
    };
    fetchArticles();
  }, []);

  const handleAnalyze = async (articleId: string, findings: string) => {
    await axios.post(`/api/articles/analyze/${articleId}`, { findings });
    setArticles(articles.filter(article => article.id !== articleId));
  };

  return (
    <div>
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article}>
          <textarea placeholder="Add findings..." />
          <button onClick={() => handleAnalyze(article.id, 'Some findings')}>Save Findings</button>
        </ArticleCard>
      ))}
    </div>
  );
};

export default Analysis;
