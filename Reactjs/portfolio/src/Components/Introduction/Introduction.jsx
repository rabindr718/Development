import { useEffect } from "react";
import Typed from "typed.js";
import React from "react";
import classes from "./Introduction.module.css";

const Introduction = () => {
  useEffect(() => {
    const typingElement = document.querySelector(".typing");

    if (typingElement) {
      const options = {
        strings: ["Professional Software Developer", "Professional Engineer"],
        typeSpeed: 90,
        backSpeed: 60,
        loop: true,
      };

      const typed = new Typed(".typing", options);

      return () => {
        typed.destroy();
      };
    }
  }, []);

  return (
    <div className={classes.container}>
      <span className={classes.Greeting}>
        Hello,{" "}
        <span className={classes.GreetingIn}>
          Mr. <span className={classes.GreetingInY}>My name is</span>
        </span>
      </span>
      <br />
      <div className={classes.divTypingName}>
        <span className={classes.myName}> </span>{" "}
        <div className={classes.nameX}>RABINDRA</div>
        <br></br>
        <span style={{ fontSize: "26.88px", fontWeight: "400" }}>
          I am{" "}
          <span
            style={{ fontSize: "26.88px", fontWeight: "600" }}
            className={`typing`}
          ></span>
        </span>
      </div>
      <br />
      <div className={classes.aboutEngg}>
        I have Completed my{" "}
        <a
          href="https://www.gtu.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.universityLink}
        >
          Bachelor's
        </a>{" "}
        in Computer Engineering from{" "}
        <a
          href="https://www.gtu.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
          className={`${classes.universityLink} ${classes.largeFont}`} // Add the new class here
        >
          Gujarat Technological University
        </a>
      </div>

      {/* <button className={classes.DownloadCV}>Download CV</button> */}
    </div>
  );
};

export default Introduction;
