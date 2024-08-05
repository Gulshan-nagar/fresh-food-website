import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <ul>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/create-order">Create Order</Link></li>
        <li><Link to="/view-orders">View Orders</Link></li>
      </ul>
    </nav>
  );
}

export default Header;
