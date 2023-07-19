import React, { useState,  } from 'react';
import { useSubmitReviewMutation } from "./app/apiSlice";
import StarSelector from './StarSelector';



function ReviewForm(parkProps) {
  console.log(parkProps)
  let parkName = parkProps.parkProps.parkName
  let parkCode = parkProps.parkProps.parkCode


  const [submitReview] = useSubmitReviewMutation()
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    submitReview({parkCode, parkName, review, rating});
  }

  const handleRatingChange = (event) => {
    const value = event.target.value;
    setRating(value);
  }

  const handleReviewChange = (event) => {
    const name = event.target.value;
    setReview(name);
  }
  let newRating = parseInt(rating)
  let realRating = newRating + 1
  console.log(newRating)


  return (
    <div>
      <div>
        <div>
          <h1>Write a review</h1>
          <form onSubmit={handleSubmit} id="review-form">
            <StarSelector value={rating}></StarSelector>
            {/* <div className="form-floating mb-3">
              <input value={rating} onChange={handleRatingChange} placeholder="Rating 0-5" required type="integer" name="rating" id="rating" className="form-control"/>
              <label htmlFor="rating">Rating 0-5</label>
            </div> */}

            <div className="mb-3">
                    <textarea onChange={handleReviewChange}placeholder="Review" name="review" id="review" rows="3"></textarea>
                </div>

            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
