import React from "react";
import { Link } from "react-router-dom";
import "../index.css"

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-left">
        <Link to="/homepage">
          <div className="header-left">
              <img src="/WGtransparent.png" alt="WGlogo" className="WGlogo" />
              <span className="header-title">WoolGoblins</span>
          </div>
        </Link>
      </nav>
      <nav className="nav">
        <Link to="/homepage#about">About</Link>
        <Link to="/archives">Archives</Link>
        <Link to="/customs">Customs</Link>
        <Link to="/homepage#contact">Contact me</Link>
      </nav>
    </header>
  );
};

export default Header;