import React, { useState,  } from 'react';
import { useUpdateParkReviewMutation } from "./app/apiSlice";



function ReviewForm(parkProps) {
  console.log(parkProps)
  let parkDetails = parkProps.parkProps
  let review_id = "64b6cfe597dc5d0c3f7fc7f0"


  const [submitReview] = useUpdateParkReviewMutation()
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    submitReview({review_id, parkDetails, review, rating});
  }
  console.log(parkDetails)

  const handleRatingChange = (event) => {
    const value = event.target.value;
    setRating(value);
  }

  const handleReviewChange = (event) => {
    const name = event.target.value;
    setReview(name);
  }


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Write a review</h1>
          <form onSubmit={handleSubmit} id="review-form">
            <div className="form-floating mb-3">
              <input value={rating} onChange={handleRatingChange} placeholder="Rating 0-5" required type="integer" name="rating" id="rating" className="form-control"/>
              <label htmlFor="rating">Rating 0-5</label>
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
