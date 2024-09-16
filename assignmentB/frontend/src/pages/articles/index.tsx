// src/pages/articles/index.tsx

import { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';
import SortableTable from '../../components/table/SortableTable';  // Adjust the import path if needed
import { Article } from '../../components/Article';  // Adjust the import path if needed

// Define props type for articles
type ArticlesProps = {
  articles: Article[];
};

// Define the Articles page component
const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers: { key: keyof Article & string; label: string }[] = [
    { key: 'title', label: 'Title' },
    { key: 'authors', label: 'Authors' },
    { key: 'source', label: 'Source' },
    { key: 'pubyear', label: 'Publication Year' },
    { key: 'doi', label: 'DOI' },
    { key: 'claim', label: 'Claim' },
    { key: 'evidence', label: 'Evidence' },
    { key: 'status', label: 'Status' },  // Optional, to view article status
  ];

  return (
    <div className="container">
      <h1>Articles Index Page</h1>
      <p>Page containing a table of articles:</p>
      <SortableTable headers={headers} data={articles} />
    </div>
  );
};


// Server-side rendering method to fetch articles
export const getServerSideProps: GetServerSideProps<ArticlesProps> = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/articles');  // API call to fetch articles

    // Map backend _id to id and include the status
    const articles = response.data.map((article: any) => ({
      id: article._id,  // Map _id to id for frontend consistency
      title: article.title || '',
      authors: article.authors || [],
      source: article.source || '',
      pubyear: article.pubyear || 0,
      doi: article.doi || '',
      claim: article.claim || '',
      evidence: article.evidence || '',
      status: article.status || '',  // Add status field
    }));

    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return {
      props: {
        articles: [],
      },
    };
  }
};


export default Articles;
