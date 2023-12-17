import React from 'react';
/* -------------- IMPORT CSS -------------- */
import './header.css';

function Header() {
  return (
    <div className="header">
      <div className="title-container">
        <h1>Password Checker</h1>
      </div>
      <div className="info-container">
        <p>Check the strength of your password below.</p>
      </div>
    </div>
  );
}

export default Header;
