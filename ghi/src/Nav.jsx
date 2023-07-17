import React from "react";
import { NavLink } from "react-router-dom";
import { useGetAccountQuery, useLogoutMutation } from "./app/apiSlice";

const Nav = () => {
  const { data: account, error, isLoading } = useGetAccountQuery();
  const [logout, logoutResponse] = useLogoutMutation();

  // console.log({ account });

  return (
    <nav>
      <div>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>{!account && <NavLink to="signup">Sign Up</NavLink>}</li>
          <li>{!account && <NavLink to="login">Login</NavLink>}</li>
          <li>
            {account && <NavLink to="wishlist">Wishlist</NavLink>}
            {!account && <NavLink to="login">Wishlist</NavLink>}
          </li>
          <li>
            {account && <NavLink to="visited">Visited</NavLink>}
            {!account && <NavLink to="login">Visited</NavLink>}
          </li>
          <li>
            {account && <NavLink to="reviews/mine">My Reviews</NavLink>}
            {!account && <NavLink to="login">My Reviews</NavLink>}
          </li>
          <li>
            {account && <NavLink to="/ws">Live Chat</NavLink>}
            {!account && <NavLink to="login">Live Chat</NavLink>}
          </li>
        </ul>
        {account && <button onClick={logout}>Log Out</button>}
      </div>
    </nav>
  );
};

export default Nav;
