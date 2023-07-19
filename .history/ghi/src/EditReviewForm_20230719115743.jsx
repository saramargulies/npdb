import React, { useState,  } from 'react';
import { useUpdateParkReviewMutation } from "./app/apiSlice";
import "./stars.css"


function ReviewForm(parkProps) {
  let parkDetails = parkProps.parkProps[1]
  let review_id = parkProps.parkProps[0]


  const [submitReview] = useUpdateParkReviewMutation()
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    submitReview({review_id, parkDetails, review, rating});
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

  let isDisabled=false
  if (typeof(rating)=="string"){
    isDisabled=true
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Edit your review</h1>
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
                    <textarea onChange={handleReviewChange}placeholder="Review" name="review" id="review" className="form-control" rows="3"></textarea>
                </div>

            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
