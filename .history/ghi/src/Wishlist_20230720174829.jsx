import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteWishlistMutation, useGetWishlistQuery, useMarkAsVisitedMutation } from './app/apiSlice';

function Wishlist() {

  const { data, isLoading, } = useGetWishlistQuery()
  const [deleteWish] = useDeleteWishlistMutation()
  const [markAsVisited] = useMarkAsVisitedMutation()



  if (isLoading) return <div>Loading...</div>
    return (
    <>
    <h1>My Wishlist</h1>
    <div className="container shadow table-responsive font-link pt-2">
    <table className="table table-sm table-striped table-bordered">
      <thead>
        <tr>
          <th>Park Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {data.map(park => {
          return (
          <tr className="object-fit" key={ park.id }>
            <td>
                { park.fullName }
            </td>
            <td>
                { park.states }
            </td>
            <td>
              <button className="btn shadow btn-primary" onClick={() => deleteWish(park.id)}>Delete</button>
            </td>
            <td>
              <button className="btn shadow btn-primary" onClick={() => markAsVisited(park.id)}>Mark as visited</button>
            </td>
          </tr>
        );
        })}
      </tbody>
    </table>
    </div>
    </>);
  }

  export default Wishlist;
