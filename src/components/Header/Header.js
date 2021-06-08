import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.png";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="title">
        <img src={logo} className="logo" alt="logomarca quizee"></img>
      </Link>
      <hr className="divider" />
    </div>
  );
};

export default Header;
