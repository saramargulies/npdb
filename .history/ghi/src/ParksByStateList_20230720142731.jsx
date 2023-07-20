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
                        <img src={park.images[0].url} alt={park.fullName} className="img-fluid rounded-start"  />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">Card title</h5>
                          <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link to={`/park/${park.parkCode}`}>{park.fullName}</Link>


                </td>
                <td>{park.description}</td>
                <td>
                  {park.images.length > 0 && (
                    <img src={park.images[0].url} alt={park.fullName} />
                  )}
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
