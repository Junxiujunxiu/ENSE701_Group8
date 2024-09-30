import { useEffect, useState } from 'react';

interface Article {
  _id: string;
  title: string;
  authors: string[];
  status: string;
}

const AnalysisPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState({ claim: '', evidence: '' });

  // Fetch articles that are in 'moderated' status and ready for analysis
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

  // Handle the change in the form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnalysisData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handle the form submission for analyzing the article
  const handleAnalyze = (id: string) => {
    if (!id) {
      console.error('ID is undefined');
      return;
    }

    // Send the analysis data (claim, evidence) to the backend
    fetch(`http://localhost:3001/api/analysis/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...analysisData, status: 'analyzed' }), // Send claim and evidence to the backend
    })
      .then(() => {
        // Remove the analyzed article from the list
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
        articles.map(article => (
          <div key={article._id} className="mb-4">
            <h2 className="text-xl">{article.title}</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAnalyze(article._id); }}>
              <div className="mb-2">
                <label>Claim:</label>
                <input
                  type="text"
                  name="claim"
                  value={analysisData.claim}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                  placeholder="Enter claim"
                />
              </div>
              <div className="mb-2">
                <label>Evidence:</label>
                <input
                  type="text"
                  name="evidence"
                  value={analysisData.evidence}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                  placeholder="Enter evidence"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Mark as Analyzed
              </button>
            </form>
          </div>
        ))
      )}
    </div>
  );
};

export default AnalysisPage;
