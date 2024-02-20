import React from "react";
import classes from "./Navbar.module.css";
function Pertange() {
  return (
    <div className={classes.percentage}>
      <div className={classes.box}>
        <p className={classes.percent}>
          <h1>96%</h1> of Events easily manage by just wedding members.
        </p>
      </div>
      <div className={classes.box}>
        <p className={classes.percent}>
          <h1>86%</h1> of invoices Are paid on time or early.
        </p>
      </div>
      <div className={classes.box}>
        <p className={classes.percent}>
          {" "}
          <h1>96%</h1> of members Feel more organized with Just wedding
          platform.
        </p>
      </div>
    </div>
  );
}

export default Pertange;
