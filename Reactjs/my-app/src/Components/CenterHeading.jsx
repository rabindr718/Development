import classes from "./Navbar.module.css";
const CenterHeading = () => {
  return (
    <div className={classes.heading}>
      <span>
        <h1>All Your Wedding Wedding Bussiness on One Platform</h1>
      </span>
      <span>Simple, efficient, yet Affordable</span>
      <div className={classes.headingButon}>
        <button className={classes.startbtn}>StartNow - it's Free</button>
        <button className={classes.demobtn}>Schedule Demo</button>
      </div>
    </div>
  );
};
export default CenterHeading;
