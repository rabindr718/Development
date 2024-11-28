import React from "react";
import classes from "./Header.module.css";
import NavBar from "./Navigator/NavBar";
const Header = () => {
  return (
    <div className={classes.container}>
      <div>HEADER</div>
      <NavBar />
    </div>
  );
};

export default Header;
