import { Star } from 'lucide-react';
import React from 'react'

function StarRating({rating}) {
     const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // Full Star
      stars.push(
        <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
      );
    } else if (rating >= i - 0.5) {
      // Half Star using gradient fill
      stars.push(
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className="text-yellow-500"
        >
          <defs>
            <linearGradient id={`half-grad-${i}`}>
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="50%" stopColor="transparent" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#half-grad-${i})`}
            stroke="#facc15"
            strokeWidth="1"
            d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 
              1.401 8.172L12 18.896l-7.335 3.868 
              1.401-8.172L.132 9.21l8.2-1.192z"
          />
        </svg>
      );
    } else {
      // Empty Star
      stars.push(<Star key={i} size={16} className="text-gray-300" />);
    }
  }
  return (
    <div>
       <div className="flex justify-center gap-[2px] mt-1">{stars}</div>
    </div>
  )
}

export default StarRating
