import React from "react";
import classes from "./Styles/about.module.css";

const About = () => {
  return (
    <div className={classes.containerAbout}>
      <div className={classes.nameTittle}>
        {/* <div>Rabindra Kumar Sharma</div> */}
        <div className={classes.aboutXTitle}>Full Stack Developer</div>
        <div className={classes.aboutTitle}>
          I am a <span className={classes.FontStyleA}>Software Engineer,</span>{" "}
          with Strong foundation in
          <ul>
            <li>
              <span className={classes.FontStyleA}>
                ReactJS, Redux, Flux and Typescript with SpringBoot.
              </span>{" "}
              i have expertise in{" "}
              <span className={classes.FontStyleA}>Javascript</span>
            </li>
            <li>
              <span className={classes.FontStyleA}>Core Java </span>along, with
              developing Restfull API using{" "}
              <span className={classes.FontStyleA}>SpringBoot </span>and{" "}
              <span className={classes.FontStyleA}>
                Spring MVC, JSP, Servlet{" "}
              </span>
            </li>
            <li>
              <span className={classes.FontStyleA}>Database</span> are{" "}
              <span className={classes.FontStyleA}>
                DBSchema, MySQL Workbench, Oracle
              </span>
            </li>
            <li>
              Integrate API with web application using{" "}
              <span className={classes.FontStyleA}>Javascript, React</span>
            </li>
            <li>
              Developement <span className={classes.FontStyleA}>iOS,</span>{" "}
              application using{" "}
              <span className={classes.FontStyleA}>Swift</span>
            </li>
            <li>
              I have also build api using{" "}
              <span className={classes.FontStyleA}>NET, PHP</span>. Based
              backend Application
            </li>

            <li>
              Using Tools IDE :
              <span className={classes.FontStyleA}>
                Xcode, VS Code, Eclipse IDE, Netbeans IDE, Android Studio,
                IntelliJ IDEA IDE CE
              </span>
            </li>
            <li>
              Using Platform :
              <span className={classes.FontStyleA}>
                MacOS, Ubuntu Linux, Windows
              </span>
            </li>
            {/* <li>
              Using Platform :
              <span className={classes.FontStyleA}>
                MacOS, Ubuntu Linux ,Windows
              </span>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
