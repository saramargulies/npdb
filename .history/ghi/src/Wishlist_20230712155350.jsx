import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAccountQuery, useGetWishlistQuery } from './app/apiSlice';

function Wishlist() {

  const { data, isLoading, } = useg

  const fetchData = async () => {
    const url = `http://localhost:8000/api/wishlists`;
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        setParks(data);
    }
  }


  useEffect(() => {
    fetchData();
  }, []);
    return (
    <>
    <h1>My Wishlist</h1>
    <table className="table table-hover table-secondary table-striped border border-dark-subtle shadow container-fluid mt-5">
      <thead className="table-group-divider">
        <tr>
          <th>Park Name</th>
          <th>Location</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody className="border-top border-dark-subtle">
        {parks.map(park => {
          return (
          <tr className="object-fit" key={ park.parkCode }>
            <td>
                { park.manufacturer }
            </td>
            <td>
                { park.model_name }
            </td>
            <td>
                { park.color }
            </td>
            <td>
                <button className="btn shadow btn-primary"><Link to={ `/shoes/${park.id}` } className="link-light" aria-current="page">Edit</Link></button>
            </td>
          </tr>
        );
        })}
      </tbody>
    </table>
    </>);
  }

  export default Wishlist;