import React, { useEffect, useState } from "react";
import "react-router-dom";
import { useParams, Link } from "react-router-dom";

const ParksByStateList = () => {

  let { state } = useParams()

  const [parks, setParks] = useState([]);

  const fetchData = async () => {
    const url = `http://localhost:8000/api/parks/${state}`;

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setParks(data.data);
      console.log(data)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <table className="table table-hover table-secondary table-striped border border-dark-subtle shadow container-fluid mt-5">

        <tbody className="border-top border-dark-subtle">
          {parks.map((park) => {
            return (
              <tr key={park.id}>
                <td>{park.fullName}</td>
                <td>{park.description}</td>
                <td>
                  { if (park.images) <img src={park.images[0].url} alt={park.fullName} /> }
                  {/* <img src={park.images[0].url} alt={park.fullName} /> */}
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
