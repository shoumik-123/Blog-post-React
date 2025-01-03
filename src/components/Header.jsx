import React, { useEffect, useState } from "react";
import logo from "../assets/synesisit-logo.png";
import "../assets/css/header.css";

const Header = () => {
  const [totalClicks, setTotalClicks] = useState(0);

  // Update the totalClicks state when the component mounts or whenever localStorage changes
  useEffect(() => {
    const storedTotalClicks = localStorage.getItem("totalClicks");
    if (storedTotalClicks) {
      setTotalClicks(parseInt(storedTotalClicks, 10));
    }
  }, []);

  return (
    <header className="header">
      <a href="/"><img src={logo} alt="Synesis IT Logo" className="" /></a>
      <div className="header-right">
        <div className="bell-container">
          <span>Bell Counter</span>
          <i className="fas fa-bell"></i>
          <span className="bell-counter">{totalClicks}</span>
        </div>
        <button className="btn sign-in">Sign in</button>
        <button className="btn register">Register</button>
      </div>
    </header>
  );
};

export default Header;
