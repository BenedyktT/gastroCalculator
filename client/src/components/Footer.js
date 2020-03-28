import React from "react";
import logo from "../assets/edamam.svg";

const Footer = () => {
  return (
    <div className="footer">
      <span>powered by</span>
      <img src={logo} alt="edamam logo" />
    </div>
  );
};

export default Footer;
