import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <header>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/design">Design</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart</NavLink>
    </header>
  );
};

export default NavBar;