import React from "react";
import classes from "./HeaderMain.module.css";
const HeaderMain = () => {
  return (
    <div className={classes.headerMain}>
      <li>Matches 14</li>
      <li>IND vs ENG</li>
      <li>MS vs LQ</li>
      <li>MH vs BR</li>
      <li>NZ vs AUS</li>
    </div>
  );
};

export default HeaderMain;
