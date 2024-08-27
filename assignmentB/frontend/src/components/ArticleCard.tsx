import React from 'react';

interface ArticleCardProps {
  article: any;
  children?: React.ReactNode;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, children }) => {
  return (
    <div className="border p-4 mb-4">
      <h3 className="text-xl">{article.title}</h3>
      <p>{article.authors.join(', ')}</p>
      <p>{article.journal}</p>
      <p>{article.year}</p>
      <div>{children}</div>
    </div>
  );
};

export default ArticleCard;
