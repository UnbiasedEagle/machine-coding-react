import { useState } from 'react';

export const StarRating = ({ starCount = 5 }) => {
  const [ratingValue, setRatingValue] = useState(-1);
  const [hoverValue, setHoverValue] = useState(-1);

  return (
    <div className='container'>
      {[...Array(starCount)].map((_, index) => {
        const activeValue = hoverValue !== -1 ? hoverValue : ratingValue;
        const isGold = index <= activeValue;

        return (
          <span
            className={`star ${isGold ? 'gold' : ''}`}
            key={index}
            onClick={() => setRatingValue(index)}
            onMouseEnter={() => setHoverValue(index)}
            onMouseLeave={() => setHoverValue(-1)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};
