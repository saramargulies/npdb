import React from "react";
import { NavLink } from "react-router-dom";
import { useGetAccountQuery, useLogoutMutation } from "./app/apiSlice";

const Nav = () => {
  const { data: account, error, isLoading } = useGetAccountQuery();
  const [logout, logoutResponse] = useLogoutMutation();

  // console.log({ account });

  return (
    <nav className="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
      <div className="container-custom container">
            <div className="navbar-brand">

                <span className="navbar-caption-wrap"><a className="navbar-caption display-5" href="https://mobiri.se"><strong>Edge</strong><span><strong>M5</strong></span></a></span>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-bs-toggle="collapse" data-target="#navbarSupportedContent" data-bs-target="#navbarSupportedContent" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <div className="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <div className="navbar-nav-container">
                    <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
                        <li className="nav-item"><NavLink to="/" className="nav-link link display-7" >
                            Home</NavLink></li>
                        <li className="nav-item">{account && <NavLink to="wishlist" className="nav-link link display-7" >
                            Wishlist</NavLink>} {!account && <NavLink to="login">Wishlist</NavLink>}</li>
                        <li className="nav-item">{account && <NavLink to="visited" className="nav-link link display-7" >
                            Visited</NavLink>} {!account && <NavLink to="login">Visited</NavLink>}</li>
                        <li className="nav-item">{account && <NavLink to="reviews/mine" className="nav-link link display-7" >
                            My Reviews</NavLink>} {!account && <NavLink to="login">My Reviews</NavLink>}</li>
                        <li className="nav-item">{account && <NavLink to="/ws" className="nav-link link display-7" >
                            Live Chat</NavLink>} {!account && <NavLink to="login">Live Chat</NavLink>}</li>
                    </ul>
                    {account && <button onClick={logout}>Log Out</button>}
                </div>

                <div className="navbar-nav-container">
                    <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
                        <li className="nav-item">{!account && <NavLink to="signup" className="btn btn-primary display-7" >
                            Sign Up</NavLink>}</li>
                        <li className="nav-item">{!account && <NavLink to="login" className="btn btn-primary display-7" >
                            Login</NavLink>}</li>
                    </ul>
                </div>
            </div>
        </div>
      {/* <div>
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
      </div> */}
    </nav>
  );
};

export default Nav;
