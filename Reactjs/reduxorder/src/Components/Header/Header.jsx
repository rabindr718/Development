import React from "react";
import cake from "./jjj.png";
import classes from "../Home/home.module.css";
const Header = () => {
  return (
    <div className={classes.parent}>
      <div className={classes.tittle}>
        <div className={classes.MobileView}>  <img
          className={classes.imageTittle}
          height="3%"
          width="3%"
          src={cake}
        />
          <br></br>
          <div className={classes.titleName}>Foodify</div></div>
        <div className={classes.customhr}></div>
      </div>
    </div>
  );
};

export default Header;
