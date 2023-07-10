import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (

    <div className="center">
      <p></p>
      <h1>404 This isn't the page you're looking for.</h1>
      <img
        src="https://i.kym-cdn.com/entries/icons/original/000/018/682/obi-wan.jpg"
        alt="Not Found"
        className="not-found-image"
      />
      <p></p>
      This isn't the page I'm looking for. Move along. Move along.
      <p>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  );
};
export default NotFoundPage;
