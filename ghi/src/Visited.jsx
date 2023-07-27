import { Link } from "react-router-dom";
import { useGetVisitedQuery, useDeleteWishlistMutation } from "./app/apiSlice";


function Visited() {
  const { data, isLoading } = useGetVisitedQuery();
  const [deleteWish] = useDeleteWishlistMutation();

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div className="page-container">
        <div className="spacer"></div>
        <h1>My Visited Parks</h1>
        <div className="container shadow table-responsive font-link pt-2">
          <table className="table table-sm table-success table-striped table-bordered">
            <thead className="table-group-divider">
              <tr>
                <th>Park Name</th>
                <th>Location</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((park) => {
                return (
                  <tr className="object-fit" key={park.id}>
                    <td>{park.fullName}</td>
                    <td>{park.states}</td>
                    <td>
                      <button className="btn shadow btn-primary">
                        <Link
                          to={`/park/${park.parkCode}`}
                          className="link-light"
                          aria-current="page"
                          style={{ textDecoration: "none" }}
                        >
                          View Park
                        </Link>
                      </button>
                    </td>
                  <td>
                    <button className="btn btn-outline-primary"
                    style={{ backgroundColor: "white" }}>
                      <Link
                        to={`/park/${park.parkCode}`}
                        aria-current="page"
                        style={{ textDecoration: "none" }}
                      >
                        Review
                      </Link>
                    </button>
                  </td>
                    <td>
                      <button
                        className="btn shadow btn-outline-primary"
                        style={{
                          border: "none",
                        }}
                        onClick={() => deleteWish(park.id)}
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
    </>
  );
}

export default Visited;
