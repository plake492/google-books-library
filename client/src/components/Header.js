import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <div className="header">
      <nav className="header-nav">
        <Link className="header-nav__link" to="/">
          Search Books
        </Link>
        <Link className="header-nav__link" to="/saved">
          View Saved Books
        </Link>
      </nav>
      <h2 className="header-title">React Book Store</h2>
    </div>
  );
}

export default Header;
