import { useEffect } from "react";
import Typed from "typed.js";
import React from "react";
import classes from "./Introduction.module.css";

const Introduction = () => {
  useEffect(() => {
    const options = {
      strings: ["Rabindra", "I'm a Professional Software Developer"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    };

    const typed = new Typed(".typing", options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className={classes.container}>
      <span className={classes.Greeting}>
        Hello,{" "}
        <span className={classes.GreetingIn}>
          Mr. <span className={classes.GreetingInY}>Narendra Modi</span>
        </span>
      </span>
      <br />
      <div className={classes.divTypingName}>
        <span className={classes.nameX}>My name is RABINDRA</span> <br />
        <span
          className={`${classes.Professional} ${classes.nameXR} typing typing`}
        ></span>
      </div>
      <br />
      <button className={classes.DownloadCV}>Download CV</button>
    </div>
  );
};

export default Introduction;
