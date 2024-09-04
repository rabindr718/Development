import React from "react";
import classes from "./Botton.module.css";
import { Link } from "react-router-dom";

const ButtonB = () => {
  return (
    <div className={classes.container}>
      <Link className={classes.porfolio}>Portfolio</Link>{" "}
      <Link className={classes.contact}>Contact</Link>{" "}
    </div>
  );
};

export default ButtonB;
