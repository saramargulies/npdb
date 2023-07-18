import React from "react";
import { useGetReviewsByAccountQuery } from "./app/apiSlice";
import ReviewForm from "./ReviewForm";

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
                  <td>{review.parkName}</td>
                  <td>{review.rating}</td>
                  <td>{review.review}</td>
                  {  parkProps = {"parkName": review.parkName, }}
                  <td>
                    <button>
                      Edit
                    </button>
                    <div>
                      <ReviewForm parkProps={}></ReviewForm>
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
