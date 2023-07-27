import React from "react";
import { useGetReviewsByAccountQuery, useDeleteReviewMutation } from "./app/apiSlice";
import EditReviewForm from "./EditReviewForm";
import { Link } from "react-router-dom";

const MyReviews = () => {
  const { data, isLoading } = useGetReviewsByAccountQuery();
  const [deleteReview] = useDeleteReviewMutation();


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="page-container">
    <div className="spacer"></div>
      <h1>Reviews for {data?.[0]?.username}</h1>
      <div className="container shadow table-responsive font-link pt-2">
        <table className="table table-sm table-success table-striped table-bordered">
          <thead className="table-group-divider">
            <tr>
              <th>Park Name</th>
              <th>Rating</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((review) => {
              return (
                <tr key={review.id}>
                  <td>
                      <Link to={`/park/${review.parkDetails.parkCode}`} className="link-dark">
                        {review.parkDetails.parkName}
                      </Link>
                    </td>
                  <td>{review.rating}</td>
                  <td>{review.review}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      Edit
                    </button>

                    <div
                      className="modal fade"
                      id="staticBackdrop"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabIndex="-1"
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="staticBackdropLabel"
                            >
                              Edit Your Review
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <EditReviewForm
                              parkProps={[review.id, review.parkDetails]}
                            ></EditReviewForm>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn shadow btn-outline-primary"
                      style={{ backgroundColor: "white" }}
                      onClick={() => deleteReview(review.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="spacer"></div>
    </div>
  </> )
};





export default MyReviews;
