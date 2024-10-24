import React from "react";
import classes from "./Styles/contact.module.css";
import { ICONS } from "../resources/ICONS";
import ContactModal from "../Modals/ContactForm"
const Contact = () => {

  const isMobile = window.innerWidth = 767;
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
        {/* ///HERE FOR MOBILE */}

        {isMobile ?
          <div className={classes.ContactFormXS}>
            <span className={classes.ContactUSX}><ContactModal /></span>
            <div className={classes.EmailAbove}>
              <a href="mailto:rksharma00000777@gmail.com" className={classes.ContactUX}>rksharma00000777@gmail.com</a>
            </div>
          </div> :
          <div className={classes.ContactFormXS}>
            <span className={classes.ContactUSX}>Contact us : ~</span>
            <div className={classes.EmailAbove}>
              <a href="mailto:rksharma00000777@gmail.com" className={classes.ContactUX}>rksharma00000777@gmail.com</a>
            </div>
          </div>}


















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
            <a href="tel:+917079121008" className={classes.iconSizeNumber}>
              <i className="fa-brands fa-whatsapp text-green-500 text-2xl"></i>
              {/* <i className="fas fa-phone-square-alt"></i> */}
            </a>
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
