import imga from "../Header/MAA.jpeg";
import React from "react";
import classess from "./Header.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className={classess.navbar}>
      <div className={classess.left}>
        <a
          href="https://www.linkedin.com/in/rabindr718/"
          className={classess.siteName}
          target="_blank"
          rel="noopener noreferrer"
        >
          Rabindra.com
        </a>
      </div>
      <div className={classess.center}>
        <ul className={classess.navItems}>
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
      </div>
      <Link to="/ProfileModal" className={classess.right}>
        <span className={classess.username}>Rabindr's MAA</span>
        <img
          className={classess.userImage}
          width="40"
          height="40"
          src={imga}
          alt="User"
        />
      </Link>
    </nav>
  );
};

export default Header;
