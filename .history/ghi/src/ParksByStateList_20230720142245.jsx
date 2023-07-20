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
