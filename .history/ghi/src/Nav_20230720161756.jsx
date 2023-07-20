import React from "react";
import { NavLink } from "react-router-dom";
import { useGetAccountQuery, useLogoutMutation } from "./app/apiSlice";

const Nav = () => {
  const { data: account, error, isLoading } = useGetAccountQuery();
  const [logout, logoutResponse] = useLogoutMutation();

  if (isLoading) {
    return null;
  }

  return (
    <nav className="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg p-0">
      <div className="container-custom container">
        <div className="navbar-brand">
          <span className="navbar-caption-wrap">
            <div>
              <NavLink to="/" className="nav-link link display-7">
                <img src="NPDBlogo.png" className="logo-img" alt="logo" />
              </NavLink>
            </div>
          </span>
        </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon">
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav-container">
            <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
              <li className="nav-item">
                <NavLink to="/" className="nav-link link display-7">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={account ? "wishlist" : "login"}
                  className="nav-link link display-7"
                >
                  Wishlist
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={account ? "visited" : "login"}
                  className="nav-link link display-7"
                >
                  Visited
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={account ? "reviews/mine" : "login"}
                  className="nav-link link display-7"
                >
                  My Reviews
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={account ? "/ws" : "login"}
                  className="nav-link link display-7"
                >
                  Live Chat
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        {!account && (
          <div className="navbar-nav-container">
            <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
              <li className="nav-item">
                <NavLink to="signup" className="btn btn-primary display-7 me-3">
                  Sign Up
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="login" className="btn btn-primary display-7">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        {account && (
          <button className="btn btn-primary display-7" onClick={logout}>
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
