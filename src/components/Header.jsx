// components/Header.jsx
import React from 'react';
import './Header.css'; // Import the CSS file for styling
import orderIcon from './order-icon.png';

function Header({ title }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="title-and-rent">
          <h1>{title}</h1>
          <button className="header-button">Rent</button>
        </div>
        <button className="order-button">
          <img src={orderIcon} alt="Add to Cart" />
        </button>
      </div>
    </header>
  );
}

export default Header;
