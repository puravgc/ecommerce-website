import React from "react";
import "./Navbar.css";
import navlogo from "../../assets/nav-logo.svg";
import navprofile from "../../assets/nav-profile.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="navlogo" src={navlogo} alt="" />
      <img className="navprofile" src={navprofile} alt="" />
    </div>
  );
};

export default Navbar;
