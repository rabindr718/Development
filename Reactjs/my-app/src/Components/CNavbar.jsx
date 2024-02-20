import classes from "./Navbar.module.css";
const CNavbar = () => {
  return (
    <div className={classes.container}>
      <select className={classes.selectopt} name="cars" id="cars">
        <option value="volvo">Add</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      <select className={classes.selectopt} name="cars" id="cars">
        <option value="volvo">Add-On</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      <div className={classes.itemBtn}>Template</div>
      <div className={classes.itemBtn}>Price</div>
      <div className={classes.itemBtn}>Resource</div>
      <button className={classes.btn}>LogIn</button>
      <button className={classes.btn1}>SignIn</button>
    </div>
  );
};
export default CNavbar;
