import { useState } from "react";

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    // Update state with the selected rating value
    setRating(value);

    // Save the rating in local storage
    localStorage.setItem("product_rating", value);
  };

  // Render the star rating component with buttons that trigger the handleClick function
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <button key={ratingValue} onClick={() => handleClick(ratingValue)}>
            {ratingValue <= rating ? "★" : "☆"}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
