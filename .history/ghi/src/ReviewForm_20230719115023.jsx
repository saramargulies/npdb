import React, { useState,  } from 'react';
import { useSubmitReviewMutation } from "./app/apiSlice";
import "./stars.css";

function ReviewForm(parkProps) {
  let parkName = parkProps.parkProps.parkName
  let parkCode = parkProps.parkProps.parkCode


  const [submitReview] = useSubmitReviewMutation()
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    submitReview({parkCode, parkName, review, rating});
  }

  const handleReviewChange = (event) => {
    const name = event.target.value;
    setReview(name);
  }

  let selectedStars = 0

  const [hoveredStarIndex, setHoveredStarIndex] = useState(-1);
  const [selectedStarIndex, setSelectedStarIndex] = useState(selectedStars - 1);

  const starClickHandler = (index) => {
    setSelectedStarIndex(index);
    setRating(index+1)
  };

  let disabled=false
  if (isNaN(rating)){
    return disabled=true
  }

  return (
    <div>
      <div>
        <div>
          <h1>Write a review</h1>
          <form onSubmit={handleSubmit} id="review-form">
            <div className="flex">
              {[...new Array(5)].map((_, i) => (
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

            <div className="mb-3">
                    <textarea onChange={handleReviewChange}placeholder="Review" name="review" id="review" rows="3"></textarea>
                </div>

            <button isDisabled={disabled}className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
