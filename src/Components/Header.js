import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="headerWrapper">
      <h3 className="headerTitle">Kuure</h3>
      <div className="navLinks">
        <a href="_blank">Settings</a>
      </div>
    </div>
  );
};

export default Header;
