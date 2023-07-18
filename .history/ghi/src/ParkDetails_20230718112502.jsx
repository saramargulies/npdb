import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetReviewsByParkQuery, useGetAccountQuery } from './app/apiSlice';
import ReviewForm from "./ReviewForm";


const ParkDetails = () => {
  const { data: account } = useGetAccountQuery();
  let { parkCode } = useParams();

  const [park, setPark] = useState();
  const { data, isLoading, } = useGetReviewsByParkQuery(parkCode)
  console.log(data)
  const fetchData = async () => {
    const url = `http://localhost:8000/api/parks/code/${parkCode}`;

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setPark(data.data[0]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let reviewed = false
  if (data){
    for (let entry of data){
      if (entry.account_id == account.id){
        reviewed = true
      }
    }
  }
  let parkProps = park?.fullName

  if (!park) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div>
      <h2>{park.fullName}</h2>
      <div>{park.description}</div>
      {park.images.length > 0 && (
        <img
          src={park.images[0].url}
          alt={park.fullName}
          style={{
            width: "300px",
            height: "300px",
            border: "4px solid #C09B75",
          }}
        />
      )}
      <div>
        <table>
          <tbody className="border-top border-dark-subtle">
            {park.activities.map((activity) => {
              return (
                <tr key={activity.id}>
                  <td>{activity.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
    <div>
            {account && !reviewed && <ReviewForm parkCode={parkCode} parkName={park?.fullName}></ReviewForm>}
            {reviewed && <p>You've already reviewed this park! If you'd like to edit your review please visit your MyReviews page.</p>}

    </div>
    </>
  );
};

export default ParkDetails;
