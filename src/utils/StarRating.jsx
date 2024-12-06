import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ starScore }) => {
  return (
    <div className="flex items-center">
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            filled={index < Math.floor(starScore)}
            partialFill={index === Math.floor(starScore) ? starScore - Math.floor(starScore) : 0}
          />
        ))}
      </div>
      <p className="ml-1 mt-0.5 text-xs font-semibold">{starScore.toFixed(1)}</p>
    </div>
  );
};

const Star = ({ filled, partialFill }) => {
  if (filled) {
    return <FaStar className="text-yellow-400" />;
  }

  if (partialFill > 0) {
    return (
      <div className="relative">
        <div className="absolute overflow-hidden text-yellow-400" style={{ width: `${partialFill * 100}%` }}>
          <FaStar />
        </div>
        <FaStar className="text-gray-200" />
      </div>
    );
  }

  return <FaStar className="text-gray-200" />;
};

export default StarRating;
