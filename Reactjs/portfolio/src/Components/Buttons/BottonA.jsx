import React from "react";
import classes from "./Botton.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const BottonA = () => {
  const navigate = useNavigate();
  const AboutMe = () => {
    navigate("/");
  };
  const Services = () => {
    navigate("/");
  };
  return (
    <div className={classes.container}>
      <Link className={classes.aboutme} onClick={AboutMe}>
        About me
      </Link>
      <Link className={classes.contact}>Contact</Link>
      <Link className={classes.porfolio}>Portfolio</Link>
      <Link className={classes.Services} onClick={Services}>
        Services
      </Link>
    </div>
  );
};

export default BottonA;
