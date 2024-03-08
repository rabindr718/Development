import React,{Fragment} from "react";
import mealsImage from "../../assets/meals.jpg"
import classes from "./header.module.css"
import HeaderCartButton from "./headercartButton";
const Header=props=>{
    return <Fragment>
<header className={classes.header}>
    <h1>Delicious Meals</h1>
    {/* Take refence from app.js and trnasfer to headerbutton */}
    <HeaderCartButton onClickButton={props.onShowCart} /> 
</header>
<div className={classes['main-image']}>
    <img src={mealsImage} alt="Sweet and Delicious Food!"/>
</div>
    </Fragment>

}

export default Header;