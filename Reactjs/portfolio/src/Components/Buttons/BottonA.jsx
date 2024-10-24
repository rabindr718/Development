import React, { useState, useEffect } from "react";
import classes from "./Botton.module.css";
import { useNavigate } from "react-router-dom";

const BottonA = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767); // state for mobile detection

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) setIsOpen(false); // Close the slider on mobile after navigation
  };

  const AboutMe = () => handleNavigation("/about");
  const PortFolio = () => handleNavigation("/");
  const Services = () => handleNavigation("/services");
  const Contact = () => handleNavigation("/contact");
  const Skills = () => handleNavigation("/skills");
  const Experience = () => handleNavigation("/experience");

  return (
    <>
      {isMobile && !isOpen && ( // Hide ☰ when slider is open
        <button className={classes.menuButton} onClick={() => setIsOpen(true)}>
          ☰
        </button>
      )}

      {isMobile && (
        <>
          <div
            className={`${classes.overlay} ${isOpen ? classes.open : ""}`}
            onClick={() => setIsOpen(false)}
          />
        </>
      )}

      <div className={`${isMobile ? classes.containerMobile : classes.container} ${isOpen ? classes.open : ''}`}>
        <button className={classes.porfolio} onClick={PortFolio}>Home</button>
        <button className={classes.contact} onClick={Skills}>Skills</button>
        <button className={classes.contact} onClick={Contact}>Contact</button>
        <button className={classes.contact} onClick={Experience}>Experience</button>
        <button className={classes.aboutme} onClick={AboutMe}>About me</button>
        <button className={classes.Services} onClick={Services}>Services</button>
      </div>
    </>
  );
};

export default BottonA;
