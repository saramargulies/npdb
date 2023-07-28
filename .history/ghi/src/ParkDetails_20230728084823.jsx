import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetReviewsByParkQuery,
  useGetAccountQuery,
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useGetVisitedQuery,
} from "./app/apiSlice";
import ReviewForm from "./ReviewForm";

const ParkDetails = () => {
  const { data: account } = useGetAccountQuery();
  const { data: wishlist } = useGetWishlistQuery();
  const { data: visited } = useGetVisitedQuery();
  const [addToWishlist] = useAddToWishlistMutation();
  const [activityColumns, setActivityColumns] = useState([[], [], []]);

  let { parkCode } = useParams();

  const [park, setPark] = useState();
  const { data, isLoading } = useGetReviewsByParkQuery(parkCode);
  const fetchData = async () => {
    const url = `http://localhost:8000/api/parks/code/${parkCode}`;

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setPark(data.data[0]);

      const columns = [[], [], []];
      let i = 0;
      for (const activity of data.data[0].activities) {
        columns[i].push(activity);
        i = i + 1;
        if (i > 2) {
          i = 0;
        }
      }
      setActivityColumns(columns);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function ActivityColumn(props) {
    return (
      <div className="col">
        {props.list.map((activity) => {
          return (
            <div key={activity.id} className="card mb-3 p-1 shadow">
              {activity.name}
            </div>
          );
        })}
      </div>
    );
  }

  let fullName = park?.fullName;
  let states = park?.states;

  let reviewed = false;
  if (data && account) {
    for (let entry of data) {
      if (entry.account_id == account.id) {
        reviewed = true;
      }
    }
  }
  let wishlisted = false;
  if (wishlist && visited && account) {
    for (let entry of wishlist) {
      if (entry.fullName == park?.fullName) {
        wishlisted = true;
      }
    }
    for (let entry of visited) {
      if (entry.fullName == park?.fullName) {
        wishlisted = true;
      }
    }
  }

  let parkProps = {
    parkCode: parkCode,
    parkName: park?.fullName,
  };

  if (!park) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="page-container">
        <div className="small-spacer"></div>
        <div className="container-fluid">
          <div>
            <h2>{park.fullName}</h2>
            <div
              id="detail-page-header"
              style={{ backgroundImage: `url(${park.images[0].url})` }}
            ></div>
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center">
                  {park.images.length > 0 && (
                    <img
                      className="img-fluid rounded-start"
                      id="detail-image"
                      src={
                        park.images[1]?.url
                          ? park.images[1]?.url
                          : "/NPDBlogo.png"
                      }
                      alt={park.fullName}
                    />
                  )}
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{park.fullName}</h5>
                    <p className="card-text">{park.description}</p>
                  </div>
                </div>
              </div>
            </div>
            {!wishlisted && account && (
              <button
                className="btn btn-primary"
                onClick={() => addToWishlist({ parkCode, fullName, states })}
              >
                Add to Wishlist
              </button>
            )}
            {wishlisted && account && (
              <button disabled={true} className="btn btn-success">
                Added
              </button>
            )}
            {account && (
              <button
                type="button"
                className="btn btn-outline-primary"
                style={{ backgroundColor: "white" }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Review Park
              </button>
            )}

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
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      Leave a Review
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div>
                      {account && !reviewed && (
                        <ReviewForm parkProps={parkProps}></ReviewForm>
                      )}
                      {reviewed && (
                        <p>
                          You've reviewed this park! If you'd like to edit your
                          review please visit your MyReviews page.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="mini-spacer"></div>
              <h3>Activities</h3>
              <div>
                <div className="row">
                  {activityColumns.map((activityList, index) => {
                    return <ActivityColumn key={index} list={activityList} />;
                  })}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mini-spacer"></div>
            <h2>Park Reviews</h2>
            <table className="table">
              <tbody>
                {data.map((review) => {
                  return (
                    <tr>
                      <td>
                        <table x>
                          <tbody>
                            <tr>
                              <td>
                                <strong>User:</strong> {review.username}{" "}
                              </td>
                              <td>
                                <strong>Rating:</strong> {review.rating}{" "}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Review:</strong> {review.review}{" "}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="small-spacer"></div>
      </div>
    </>
  );
};

export default ParkDetails;
