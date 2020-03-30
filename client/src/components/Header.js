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
          <div className="nav__element nav__element--home">
            {" "}
            <Link to="/">Home</Link>
          </div>
          <div className="nav__element">
            {" "}
            <Link to="/recipes">Browse Recipes</Link>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
