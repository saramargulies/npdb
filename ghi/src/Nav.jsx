import React from 'react'
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (

    <nav>
        <div>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
             <li>
                <NavLink to="signup">Sign Up</NavLink>
            </li>
            <li>
                <NavLink to="login">Login</NavLink>
            </li>
            <li>
                <NavLink to="logout">Log Out</NavLink>
            </li>
            <li>
                <NavLink to="wishlist">Wishlist</NavLink>
            </li>
             <li>
                <NavLink to="visited">Visited</NavLink>
            </li>
            <li>
                <NavLink to="reviews/mine">My Reviews</NavLink>
            </li>

        </ul>
        </div>
    </nav>
  )
}

export default Nav
