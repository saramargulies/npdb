import React from "react";
import { useGetReviewsByAccountQuery } from "./app/apiSlice";
import EditReviewForm from ""

const MyReviews = () => {
  const { data, isLoading } = useGetReviewsByAccountQuery();
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // if (!data) {
  //   return <div>No reviews for this account yet!</div>
  // }

  return (
    <div>
      <div>
        <h2>Reviews</h2>
        <table>
          <tbody className="border-top border-dark-subtle">
            {data?.map((review) => {
              return (
                <tr key={review.id}>
                  <td>{review.parkDetails.parkName}</td>
                  <td>{review.rating}</td>
                  <td>{review.review}</td>
                  <td>
                    <button>
                      Edit
                    </button>
                    <div>
                      <EditReviewForm parkProps={review.parkDetails}></EditReviewForm>
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
