import React from "react";
import { useState } from "react";
import classes from "./Footer.module.css";
import Login from "../Modals/Login"
const Footer = () => {
  const [openLoginModal, setLoginModal] = useState(false);


  const OnclickRedirect = () => {
    setLoginModal(true)

  }
  return <>
    {openLoginModal && <Login setLoginModal={setLoginModal} />
    }    <div className={classes.container}>Thank You! for Visit.
      <span className={classes.RabindraSharma}><span>&copy;	</span> Reserved by <span onClick={OnclickRedirect} className={classes.NameX}>
        {/* @ */}
        Rabindra</span></span>
    </div></>;
};

export default Footer;
