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
      setParks(data.states);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <table className="table table-hover table-secondary table-striped border border-dark-subtle shadow container-fluid mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-top border-dark-subtle">
          {parks.map((state) => {
            return (
              <tr key={state.id}>
                <td>{state.fullName}</td>
                <td>{state.description}</td>
                <td>
                  <img src={state.images[0]} alt={state.fullName} />
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
