import React from "react";
import { Link } from "react-router-dom";
import classess from "../Header/Header.module.css";
const Header = () => {
  return (
    <div>
      <header className={classess.header}>
        <nav className={classess.navbar}>
          <ul>
            <span>
              <Link style={{ color: "white", textDecoration: "none" }} to="/">
                Gift City.com
              </Link>
            </span>

            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Registeration">Register</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
            <li>
              <Link to="/Services">Services</Link>
            </li>
            <li>
              <Link to="/Contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
