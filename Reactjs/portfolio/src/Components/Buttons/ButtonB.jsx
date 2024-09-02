import React from "react";
import classes from "./Botton.module.css";
import { Link } from "react-router-dom";

const ButtonB = () => {
  return (
    <div className={classes.container}>
      <Link>Portfolio</Link> <Link>Contact</Link>{" "}
    </div>
  );
};

export default ButtonB;
