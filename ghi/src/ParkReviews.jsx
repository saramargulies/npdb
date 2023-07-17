import React from "react";
import { useGetReviewsByParkQuery } from "./app/apiSlice";

const MyReviews = () => {
  const { data, isLoading } = useGetReviewsByParkQuery();
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
            {data.map((review) => {
              return (
                <tr key={review.id}>
                  <td>{review.rating}</td>
                  <td>{review.review}</td>
                  <td>{review.username}</td>
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
