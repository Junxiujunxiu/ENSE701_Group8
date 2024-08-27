import React, { useState } from 'react';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';
import SearchBar from '../components/SearchBar';

const Search: React.FC = () => {
  const [articles, setArticles] = useState([]);

  const handleSearch = async (query: string) => {
    const response = await axios.get(`/api/articles?seMethod=${query}`);
    setArticles(response.data);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="mt-4">
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Search;
