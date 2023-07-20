import React from "react";
import { useGetReviewsByAccountQuery } from "./app/apiSlice";
import EditReviewForm from "./EditReviewForm";

const MyReviews = () => {
  const { data, isLoading } = useGetReviewsByAccountQuery();
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h2>Reviews</h2>
        <table>
          <tbody>
            {data?.map((review) => {
              return (
                <tr key={review.id}>
                  <td>{review.parkDetails.parkName}</td>
                  <td>{review.rating}</td>
                  <td>{review.review}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      Edit Your Review
                    </button>

                    <div
                      class="modal fade"
                      id="staticBackdrop"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabindex="-1"
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1
                              class="modal-title fs-5"
                              id="staticBackdropLabel"
                            >
                              Edit Your Review
                            </h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <EditReviewForm
                              parkProps={[review.id, review.parkDetails]}
                            ></EditReviewForm>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReviews;
