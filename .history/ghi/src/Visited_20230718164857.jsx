import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetVisitedQuery, useDeleteWishlistMutation } from './app/apiSlice';

function Visited() {

  const { data, isLoading, } = useGetVisitedQuery()
  const [deleteWish] = useDeleteWishlistMutation()

  console.log(data)

  
  if (isLoading) return <div>Loading...</div>
    return (
    <>
    <h1>My Visited Parks</h1>
    <div>
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
        {data?.map(park => {
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
              <button className="btn shadow btn-primary"><Link to={ `/park/${park}` } className="link-light" aria-current="page">Review</Link></button>
            </td>
          </tr>
        );
        })}
      </tbody>
    </table>
    </div>
    </>);
  }

  export default Visited;