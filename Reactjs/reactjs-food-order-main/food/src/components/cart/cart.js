import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import classes from "./cart.module.css";
import Modal from "../uI/modal";
import CartItem from "./cartItem";
import Checkout from "./checkout";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setdidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount?.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const SubmitOrderHandler = (userData) => {
    setIsSubmitting(true);
    fetch("https://a-food-order-app-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    });
    setIsSubmitting(false);
    setdidSubmit(true);
    cartCtx.clearCart(); // This is For Clear Cart After Submitted The Value
  };

  const CartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeItemHandler.bind(null, item.id)}
          onAdd={addItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const onOrderHandler = () => setIsCheckout(true);

  const ModelActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={onOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const CartmodelActions = (
    <React.Fragment>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={SubmitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && ModelActions}
    </React.Fragment>
  );
  const issubmittingModelContents = <p>Sending oreder Data...</p>;

  const didSuccessFullySubmitToModel = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && CartmodelActions}
      {isSubmitting && issubmittingModelContents}
      {!isSubmitting && didSubmit && didSuccessFullySubmitToModel}
    </Modal>
  );
};
export default Cart;
