import { Link } from "react-router-dom";
import {
  useDeleteWishlistMutation,
  useGetWishlistQuery,
  useMarkAsVisitedMutation,
} from "./app/apiSlice";

function Wishlist() {
  const { data, isLoading } = useGetWishlistQuery();
  const [deleteWish] = useDeleteWishlistMutation();
  const [markAsVisited] = useMarkAsVisitedMutation();

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div className="page-container">
        <div className="spacer"></div>
        <h1>My Wishlist</h1>
        <div className="container shadow table-responsive font-link pt-2">
          <table className="table table-sm table-success table-striped table-bordered">
            <thead className="table-group-divider">
              <tr>
                <th>Park Name</th>
                <th>Location</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((park) => {
                return (
                  <tr className="object-fit" key={park.id}>
                    <td>
                      <Link to={`/park/${park.parkCode}`} className="link-dark">
                        {park.fullName}{" "}
                      </Link>
                    </td>
                    <td>{park.states}</td>
                    <td>
                      <button
                        className="btn shadow btn-primary"
                        onClick={() => markAsVisited(park.id)}
                      >
                        Mark Visited
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn shadow btn-outline-primary"
                        style={{ backgroundColor: "white" }}
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

export default Wishlist;
