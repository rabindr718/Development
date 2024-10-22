import React from "react";
import classes from "./Botton.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BottonA = () => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 767;

  const AboutMe = () => {
    navigate("/about"); // Changed path to '/about' (ensure it's defined in routes)
  };
  const PortFolio = () => {
    navigate("/");
  };
  const Services = () => {
    navigate("/services"); // Changed path to '/services' (ensure it's defined in routes)
  };

  const Contact = () => {
    navigate("/contact"); // Navigate to '/contact' path
  };
  const Skills = () => {
    navigate("/skills");
  };
  const Experience = () => {
    navigate("/experience");
  };
  return (
    <div className={isMobile ? classes.containerMobile : classes.container}>
      <button className={classes.porfolio} onClick={PortFolio}>
        Home
      </button>
      <button className={classes.contact} onClick={Skills}>
        Skills
      </button>
      <button className={classes.contact} onClick={Contact}>
        Contact
      </button>
      <button className={classes.contact} onClick={Experience}>
        Experience
      </button>
      <button className={classes.aboutme} onClick={AboutMe}>
        About me
      </button>

      <button className={classes.Services} onClick={Services}>
        Services
      </button>
    </div>
  );
};

export default BottonA;
