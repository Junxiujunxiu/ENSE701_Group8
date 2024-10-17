// src/components/ArticleDetail.tsx
import { useState } from 'react';
import { Article } from '../Article';
import styles from './articleDetails.module.scss';

type ArticleDetailProps = {
  article: Article;
  onClose: () => void;  // Pass a function to close the detail window
  onUpdate: (updatedArticle: Article) => void;  // Add onUpdate prop for submitting updated article
};

export const ArticleDetail = ({ article, onClose, onUpdate }: ArticleDetailProps) => {
  const [sePractice, setSePractice] = useState(article.sePractice || '');
  const [researchType, setResearchType] = useState(article.researchType || '');
  const [peerReviewed, setPeerReviewed] = useState(article.peerReviewed || false);
  const [publicationType, setPublicationType] = useState(article.publicationType || '');

  const handleUpdateClick = () => {
    const updatedArticle = {
      ...article,
      sePractice,
      researchType,
      peerReviewed,
      publicationType,
    };
    onUpdate(updatedArticle);

    // Show success alert
    alert('Article updated successfully!');   //add this one for TTD checking.
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        {/* Close button */}
        <button
          className={styles.closeButton}
          onClick={onClose}
        >
          ×
        </button>

        {/* Article Details */}
        <h2 className={styles.articleTitle}>{article.title}</h2>
        <p className={styles.articleAuthors}>Authors: {article.authors.join(', ')}</p>
        <p className={styles.articleSource}>Source: {article.source}</p>
        <p className={styles.articlePubYear}>Publication Year: {article.pubyear}</p>
        <p className={styles.articleDoi}>
          DOI: <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noopener noreferrer" className={styles.doiLink}>{article.doi}</a>
        </p>

        <div className={styles.articleSection}>
          <h3 className={styles.articleSectionTitle}>Claim</h3>
          <p className={styles.articleText}>{article.claim}</p>
        </div>

        <div className={styles.articleSection}>
          <h3 className={styles.articleSectionTitle}>Evidence</h3>
          <p className={styles.articleText}>{article.evidence}</p>
        </div>

        <p className={styles.articleStatus}>Status: <span className={styles.statusText}>{article.status}</span></p>
      
        <div className={styles.articleSection}>
          <h3>Review Details:</h3>
          <div className={styles.inputContainer}>
            <label className={styles.label}>
              SE Practice:
              <textarea
                className={styles.inputArea} // Apply new style here
                value={sePractice}
                onChange={(e) => setSePractice(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>
              Research Type:
              <textarea
                className={styles.inputArea} // Apply new style here
                value={researchType}
                onChange={(e) => setResearchType(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>
              Peer Reviewed:
              <input
                type="checkbox"
                checked={peerReviewed}
                onChange={(e) => setPeerReviewed(e.target.checked)}
              />
            </label>
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>
              Publication Type:
              <textarea
                className={styles.inputArea} // Apply new style here
                value={publicationType}
                onChange={(e) => setPublicationType(e.target.value)}
              />
            </label>
          </div>
          <button className={styles.updateButton} onClick={handleUpdateClick}>
            Update Article
          </button>
        </div>




      </div>
    </div>
  );
};
