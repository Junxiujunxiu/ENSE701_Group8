import { useEffect, useState } from 'react';
import { Article } from '../../components/Article'; // Adjust the import path accordingly

const AnalysisPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Use the dynamic API URL from environment variables
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  // Ensure all form inputs have initial values to avoid uncontrolled component issues
  const [sePractice, setSePractice] = useState(''); // Initialize with an empty string
  const [claim, setClaim] = useState(''); // Initialize with an empty string
  const [evidenceResult, setEvidenceResult] = useState(''); // Initialize with an empty string
  const [researchType, setResearchType] = useState(''); // Initialize with an empty string
  const [participants, setParticipants] = useState(''); // Initialize with an empty string
  const [researchEvidenceType, setResearchEvidenceType] = useState(''); // Initialize with an empty string
  const [keyFindings, setKeyFindings] = useState(''); // Initialize with an empty string
  const [peerReviewed, setPeerReviewed] = useState(false); // Initialize with false for checkbox
  const [publicationType, setPublicationType] = useState(''); // Initialize with an empty string

  useEffect(() => {
    // Fetch the articles for analysis using the dynamic API URL
    fetch(`${apiUrl}/api/analysis`)
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching analysis articles:', err);
        setLoading(false);
      });
  }, [apiUrl]);

  const handleAnalyze = async (id: string | undefined) => {
    if (!id) {
      console.error('ID is undefined');
      return;
    }

    // Gather existing article information (for simplicity, assuming you can access the current article's details)
    const currentArticle = articles.find(article => article._id === id || article.id === id);

    if (!currentArticle) {
      console.error('Article not found');
      return;
    }

    const analysisData = {
      sePractice: sePractice || currentArticle.sePractice, // Use existing value if not set
      claim,
      evidenceResult,
      researchType: researchType || currentArticle.researchType,  // Use existing value if not set
      participants,
      researchEvidenceType,
      keyFindings,
      peerReviewed: peerReviewed !== undefined ? peerReviewed : currentArticle.peerReviewed,  // Use existing value if not set
      publicationType: publicationType || currentArticle.publicationType,  // Use existing value if not set
      status: 'analyzed',
    };

    try {
      // Update the article analysis data using the dynamic API URL
      await fetch(`${apiUrl}/api/analysis/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analysisData),
      });

      // Fetch updated articles after successful analysis
      const response = await fetch(`${apiUrl}/api/analysis`);
      const updatedArticles = await response.json();
      setArticles(updatedArticles); // Update the list
    } catch (error) {
      console.error('Error analyzing article:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Analysis</h1>

      {/* Input fields for new analysis data */}
      <div>
        <input
          type="text"
          placeholder="SE Practice"
          value={sePractice}
          onChange={(e) => setSePractice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Claim"
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
        />
        <input
          type="text"
          placeholder="Evidence Result"
          value={evidenceResult}
          onChange={(e) => setEvidenceResult(e.target.value)}
        />
        <input
          type="text"
          placeholder="Research Type"
          value={researchType}
          onChange={(e) => setResearchType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Participants"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        />
        <input
          type="text"
          placeholder="Research Evidence Type"
          value={researchEvidenceType}
          onChange={(e) => setResearchEvidenceType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Key Findings"
          value={keyFindings}
          onChange={(e) => setKeyFindings(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={peerReviewed}
            onChange={() => setPeerReviewed(!peerReviewed)}
          />
          Peer Reviewed
        </label>
        <input
          type="text"
          placeholder="Publication Type"
          value={publicationType}
          onChange={(e) => setPublicationType(e.target.value)}
        />
      </div>

      {articles.length === 0 ? (
        <p>No articles awaiting analysis.</p>
      ) : (
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article._id || article.id}>
                <td>{article.title}</td>
                <td>{article.authors.join(', ')}</td>
                <td>{article.status}</td>
                <td>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleAnalyze(article._id || article.id)}
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
