import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';
import { Article } from '../types'; // Import the Article type

const Analysis: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get<Article[]>('/analysts/analysis');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div>
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article}>
          <textarea placeholder="Add findings..." />
          <button onClick={() => console.log(`Article ${article.id} findings saved`)}>Save Findings</button>
        </ArticleCard>
      ))}
    </div>
  );
};

export default Analysis;
