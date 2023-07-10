import React, { useEffect, useState } from "react";
import "react-router-dom";

const ParksByStateList = () => {

  let {}

  const [states, setStates] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8000/api/parks/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setStates(data.states);
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
          {states.map((state) => {
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
