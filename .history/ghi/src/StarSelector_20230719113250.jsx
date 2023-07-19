"use client";
import { useState } from "react";
import "./stars.css";

export default function StarSelector({ selectedStars = 0 }) {
  const [hoveredStarIndex, setHoveredStarIndex] = useState(-1);
  const [selectedStarIndex, setSelectedStarIndex] = useState(selectedStars - 1);
  const starClickHandler = (index) => {
    setSelectedStarIndex(index);
    console.log(index);
    // Add selected stars to database
  };

  return (
    <div className="flex">
      {[...new Array()].map((_, i) => (
        <div
          onClick={() => starClickHandler(i)}
          onMouseEnter={() => setHoveredStarIndex(i)}
          onMouseLeave={() => setHoveredStarIndex(-1)}
          className={`star-wrapper cursor-pointer ${
            hoveredStarIndex >= i || selectedStarIndex >= i ? "hovered" : ""
          }`}
          key={i}
        >
          <span className="material-icons star-filled !text-5xl text-yellow-300">
            star
          </span>
          <span className="material-icons-outlined star-empty !text-5xl text-yellow-300">
            grade
          </span>
        </div>
      ))}
    </div>
  );
}
