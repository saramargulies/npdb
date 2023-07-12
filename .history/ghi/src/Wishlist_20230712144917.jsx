import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Wishlist() {

  const [shoes, setShoes] = useState([]);

  const fetchData = async () => {
    const url = 'http://localhost:8080/api/shoes/';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        setShoes(data.shoes);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
    return (
    <>
    <Link to="new/" className="mt-4 btn shadow btn-primary">Add a shoe</Link>
    
    <table className="table table-hover table-secondary table-striped border border-dark-subtle shadow container-fluid mt-5">
      <thead className="table-group-divider">
        <tr>
          <th>Manufacturer</th>
          <th>Model Name</th>
          <th>Color</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody className="border-top border-dark-subtle">
        {shoes.map(shoe => {
          return (
          <tr className="object-fit" key={ shoe.id }>
            <td>
                { shoe.manufacturer }
            </td>
            <td>
                { shoe.model_name }
            </td>
            <td>
                { shoe.color }
            </td>
            <td>
                <button className="btn shadow btn-primary"><Link to={ `/shoes/${shoe.id}` } className="link-light" aria-current="page">Edit</Link></button>
            </td>
          </tr>
        );
        })}
      </tbody>
    </table>
    </>);
  }

  export default Wishlist;