import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ParkDetails = () => {
  let { code } = useParams();

  const [park, setPark] = useState();

  const fetchData = async () => {
    console.log({ code });
    const url = `http://localhost:8000/api/parks/code/${code}`;

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setPark(data.data[0]);
      console.log(data.data[0]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!park) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{park.fullName}</h2>
      <div>{park.description}</div>
      {park.images.length > 0 && (
        <img
          src={park.images[0].url}
          alt={park.fullName}
          style={{
            width: "300px",
            height: "300px",
            border: "4px solid #C09B75",
          }}
        />
      )}
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
};

export default ParkDetails;

// function ParkDetails() {
//   let { parkCode } = useParams();
//   const [ park, setPark] = useState(null);

//   useEffect(() => {
//     async function fetchPark() {
//       const response = await fetch(`http://localhost:8000/api/parks/code/${parkCode}`);

//       if (response.ok) {
//         const data = await response.json();

//         setPark(data[0]);
//       }
//     }

//     fetchPark();
//   }, [parkCode]);
