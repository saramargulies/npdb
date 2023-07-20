import React, { useEffect, useState } from "react";
import "react-router-dom";
import { useParams, Link } from "react-router-dom";

const ParksByStateList = () => {
  let { state } = useParams();

  const [parks, setParks] = useState([]);

  const fetchData = async () => {
    const url = `http://localhost:8000/api/parks/${state}`;

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setParks(data.data);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <table>
        <tbody>
          {parks.map((park) => {
            return (
              <tr key={park.id}>
                <td>
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        {park.images.length > 0 && (
                         <img className="img-fluid rounded-start" src={park.images[0].url} alt={park.fullName} />
                      )}
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">         <Link to={`/park/${park.parkCode}`}>{park.fullName}</Link></h5>
                          <p className="card-text">{park.description}</p>
                          <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
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
    </>
  );
};

export default ParksByStateList;
