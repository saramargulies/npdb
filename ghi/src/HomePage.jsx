import React from "react";
import { useNavigate } from "react-router-dom";
import USAMap from "react-usa-map";
import "./map.css";

const HomePage = () => {
  let navigate = useNavigate();

  function mapHandler(event) {
    console.log(event.target.dataset.name);
    navigate(`/parks/${event.target.dataset.name}`);
  }

  return (
    <>
      <div
        className="container-fluid"
        style={{
          backgroundImage: `url("https://vastphotos.com/files/uploads/photos/11076/high-resolution-yellowstone-photo-l.jpg?v=20220712073521")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="col-sm-6 flex-grow-1 justify-content-center">
          <USAMap
            title=""
            defaultFill="#f2e2c4"
            height="60rem"
            width="auto"
            onClick={mapHandler}
          />
        </div>
        <div className="col flex-shrink-1 justify-content-center">
          <div className="card text-dark bg-light mb-3">
            <div id="welcome-card-header" className="card-header">
              Welcome to NPDB!
            </div>
            <div id="welcome-card-body" className="card-body">
              <h5 className="card-title">Choose a State!</h5>
              <p className="card-text">
                Click on a state to see all of the national parks in that state.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
