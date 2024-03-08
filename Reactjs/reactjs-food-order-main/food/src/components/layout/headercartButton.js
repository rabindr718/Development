import React, { useContext, useEffect, useState} from "react";
import CartIcon from "../cart/cartIcon";
import classes from './headerCartButton.module.css'
import CartContext from "../../store/cart-context";

const HeaderCartButton=(props)=>{

  const cartCtx=useContext(CartContext)
  const {items}=cartCtx;
 

  const NumberofCartItems=items.reduce((curNumber, item)=>{
  return curNumber +item.amount; },0)
  const [buttonIsHighLighted, setButtonisHighlighted]=useState(false);

  
    const ButtonClasses=`${classes.button} ${buttonIsHighLighted ? classes.bump :""}`;

    useEffect(()=>{ if(items.length===0){
      return;
    }
      setButtonisHighlighted(true)

      const timer=setTimeout(() => {
        setButtonisHighlighted(false)
      
      }, 300);
      return ()=>{
        clearTimeout(timer);
      };
     },[items])

    return<button  onClick ={props.onClickButton} className={ButtonClasses}>
    <span className={classes.icon}>
      <CartIcon />
    </span>
    <span>Your Cart</span> 
    <span className={classes.badge}>{NumberofCartItems}</span>  </button>

    {/* Go to add Item */}


}



export default HeaderCartButton;






