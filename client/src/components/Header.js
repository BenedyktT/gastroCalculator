import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-overlay">
      <header className="header">
        <Link to="/">
          <h1>Gastro Calculator</h1>
        </Link>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/recipes">Browse Recipes</Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;
