import React from "react";
import classes from "./Styles/contact.module.css";
import { ICONS } from "../resources/ICONS";

const Contact = () => {
  return (
    <div className={classes.containerContact}>
      <div className={classes.leftSide}>
        <img
          src={ICONS.myImage1}
          alt="Contact Image"
          className={classes.contactImage}
        />
      </div>
      <div className={classes.rightSide}>
        <span className={classes.ContactUSX}>Contact us : ~</span>
        <span>
          <a
            href="mailto:rksharma00000777@gmail.com"
            className={classes.ContactUX}
          >
            rksharma00000777@gmail.com
          </a>
        </span>

        <div className={classes.ICONContainer}>
          <a
            className={classes.githubIcon}
            href="https://github.com/rabindr718"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-git"></i>{" "}
          </a>
          <a
            className={classes.stackOverflowIcon}
            href="https://stackoverflow.com/users/23137585/rabindr718"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-stack-overflow"></i>
          </a>
          <a
            className={classes.linkedinIcon}
            href="https://www.linkedin.com/in/rabindr718/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            className={classes.appleIcon}
            href="https://developer.apple.com/forums/profile/rabindr718"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-apple"></i>{" "}
          </a>

          <a
            className={classes.twitterIcon}
            href="https://x.com/rabindr718"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            className={classes.instagramIcon}
            href="https://instagram.com/rabindr718"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        <div className={classes.NumberContainer}>
          <p>
            <i
              href="tel:+917079121008"
              className={`${classes.iconSizeNumber} fas fa-phone-square-alt`}
            ></i>
            <a className={classes.NumberLetter} href="tel:+917079121008">
              +91 7079121008
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
