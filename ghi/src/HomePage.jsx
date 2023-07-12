import React from "react";
import { Link, useNavigate } from "react-router-dom";
import USAMap from "react-usa-map";

// const states = [
//   "AL",
//   "AK",
//   "AS",
//   "AZ",
//   "AR",
//   "CA",
//   "CO",
//   "CT",
//   "DE",
//   "DC",
//   "FM",
//   "FL",
//   "GA",
//   "GU",
//   "HI",
//   "ID",
//   "IL",
//   "IN",
//   "IA",
//   "KS",
//   "KY",
//   "LA",
//   "ME",
//   "MH",
//   "MD",
//   "MA",
//   "MI",
//   "MN",
//   "MS",
//   "MO",
//   "MT",
//   "NE",
//   "NV",
//   "NH",
//   "NJ",
//   "NM",
//   "NY",
//   "NC",
//   "ND",
//   "MP",
//   "OH",
//   "OK",
//   "OR",
//   "PA",
//   "PR",
//   "RI",
//   "SC",
//   "SD",
//   "TN",
//   "TX",
//   "UT",
//   "VT",
//   "VI",
//   "VA",
//   "WA",
//   "WV",
//   "WI",
//   "WY",
// ];

const HomePage = () => {
  let navigate = useNavigate();

  function mapHandler(event) {
    console.log(event.target.dataset.name);
    navigate(`/parks/${event.target.dataset.name}`);
  }

  return (
    <>
      <USAMap title="" onClick={mapHandler} />

      {/* <table className="table table-hover table-secondary table-striped border border-dark-subtle shadow container-fluid mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody className="border-top border-dark-subtle">
          {states.map((state) => {
            return (
              <tr key={state}>
                <td>
                  <button className="btn shadow btn-primary">
                    <Link
                      to={`/parks/${state}`}
                      className="link-light"
                      aria-current="page"
                    >
                      {state}
                    </Link>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </>
  );
};

export default HomePage;
