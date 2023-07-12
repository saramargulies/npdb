import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAccountQuery, useGetWishlistQuery } from './app/apiSlice';

function Wishlist() {

  const { data, isLoading, } = useGetWishlistQuery()

  if (isLoading) return <div>Loading...</div>
  else {
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
        {data.map(park => {
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