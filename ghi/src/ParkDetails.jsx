import React, { useEffect, useState } from "react";
import {useParams, Link } from "react-router-dom";

function ParkDetails() {
  let { parkCode } = useParams();
  const [ park, setPark] = useState(null);

  useEffect(() => {
    async function fetchPark() {
      const response = await fetch(`http://localhost:8000/api/parks/code/${parkCode}`);

      if (response.ok) {
        const data = await response.json();

        setPark(data[0]);
      }
    }

    fetchPark();
  }, [parkCode]);

  if (!park) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>{park.fullName}</h2>
      <div>{park.description}</div>
      <img
        src={park.images[0].url}
        alt={park.fullName}
        style={{ width: "400px", border: "4px solid #00b601" }}
      />
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
    </div>
  );
}

export default ParkDetails
