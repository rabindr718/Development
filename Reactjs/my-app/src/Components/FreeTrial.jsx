import React from "react";
import classes from "./Navbar.module.css";
import FreeTrialImg from "./images/Image1.png";
function FreeTrial() {
  return (
    <div className={classes.freetrail}>
      <div>
        <div className={classes.freeitemT}>
          Put Just Wedding to work for $1/mo<br></br>
          <span className={classes.freeitemTS}>Use code:JW2024SAVE</span>
          <br></br>
          <button className={classes.freeitemTB}>Start Free Trial</button>
        </div>
      </div>

      <div>
        <img
          className={classes.freeitemImage}
          src={FreeTrialImg}
          height={280}
          width={340}
        ></img>
      </div>
    </div>
  );
}

export default FreeTrial;
