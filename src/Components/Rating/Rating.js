import { useState, useEffect } from "react";
import "./Rating.scss";

const StarRating = ({ productId }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const storedRating = localStorage.getItem(`product_rating_${productId}`);

    if (storedRating) {
      setRating(JSON.parse(storedRating));
    }
  }, [productId]);

  const handleClick = (value) => {
    setRating(value);

    localStorage.setItem(`product_rating_${productId}`, JSON.stringify(value));
  };

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <button
            className={ratingValue <= rating ? "rating__yellow-star" : "rating"}
            key={ratingValue}
            onClick={() => handleClick(ratingValue)}
          >
            {ratingValue <= rating ? "★" : "☆"}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
