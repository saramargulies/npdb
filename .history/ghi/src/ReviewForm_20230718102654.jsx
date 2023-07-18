import React, { useState,  } from 'react';
import { useSubmitReviewMutation } from "./app/apiSlice";



function ReviewForm(code) {

  const [submitReview] = useSubmitReviewMutation()
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [parkCode, setParkCode] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(setParkCode, review, rating)
    submitReview({code, review, rating});
  }

  const handleRatingChange = (event) => {
    const value = event.target.value;
    setRating(value);
  }

  const handleReviewChange = (event) => {
    const name = event.target.value;
    setReview(name);
  }

  const handleParkCodeChange = (event) => {
    const name = event.target.value;
    setParkCode(name);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Write a review</h1>
          <form onSubmit={handleSubmit} id="review-form">
            {/* <div className="form-floating mb-3">
              <input value={parkCode} onChange={handleParkCodeChange} placeholder="Park Code" required type="text" name="parkCode" id="parkCode" className="form-control"/>
              <label htmlFor="parkCode">Park Code</label>
            </div> */}
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
