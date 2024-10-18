import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';

interface RatingStarsProps {
  articleId: string;
  currentRating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ articleId, currentRating }) => {
  const [rating, setRating] = useState<number>(currentRating);
  const [articleData, setArticleData] = useState<any>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false); 

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/articles/${articleId}`);
        setArticleData(response.data);
        setRating(response.data.totalRating / response.data.ratingCount);
      } catch (error) {
        console.error('Error fetching article data:', error);
      }
    };

    fetchArticleData();
  }, [articleId]);

  const handleRatingChange = async (newRating: number) => {
    if (!articleData) {
      console.error('Article data is not available');
      return;
    }
    
    //to confirm rating
    const isConfirmed = window.confirm(`Rate this article ${newRating} stars?`);
    if (!isConfirmed) {
      return; 
    }

    try {
      const response = 
      await axios.patch(`http://localhost:3001/api/articles/${articleId}/rate`, {
        rating: newRating,
        claim: articleData.claim,
      });

      const updatedArticle = response.data;
      setRating(updatedArticle.totalRating / updatedArticle.ratingCount);

      // console.log('Rating update successful:', response.data);

      alert('Rating completed, thanks!');

      setIsEditable(false);

    } catch (error) {
      console.error('Error rating article:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditable(true); // testing
  };
  
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {articleData ? (
        <ReactStars
          key={isEditable ? 'editable' : 'non-editable'} //force rendering rating section
          count={5}
          size={24}
          value={rating}
          edit={isEditable} //testing
          onChange={handleRatingChange}
          activeColor="#ffd700"
        />
      ) : (
        <p>Loading rating...</p>
      )}
      {/* rating button */}
      <button
        onClick={handleEditClick}
        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
        disabled={isEditable} // disable button if in editing mode
      >
        Rate
      </button>
    </div>
  );
};

export default RatingStars;
