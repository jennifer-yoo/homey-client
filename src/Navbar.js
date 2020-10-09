import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <header>
      <div className="header-inner">
        <div className='logo'>HOMEY</div>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/design">DESIGN</NavLink>
          <NavLink to="/products">PRODUCTS</NavLink>
          <NavLink to="/cart">CART</NavLink>
      </div>
    </header>
  );
};

export default NavBar;