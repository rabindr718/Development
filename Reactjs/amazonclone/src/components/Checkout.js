// src/pages/Checkout.js
import React, { useState, useEffect } from "react";
import {
  getCartItems,
  removeFromCart,
  updateCartItem,
} from "../services/cartService";
import { processPayment } from "../services/paymentService";
import styles from "./Checkout.module.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getCartItems();
      setCartItems(items);
    };
    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (itemId) => {
    await removeFromCart(itemId);
    const updatedItems = await getCartItems();
    setCartItems(updatedItems);
  };

  const handleUpdateCart = async (itemId, quantity) => {
    await updateCartItem(itemId, quantity);
    const updatedItems = await getCartItems();
    setCartItems(updatedItems);
  };

  const handleCheckout = async () => {
    const paymentResult = await processPayment({
      name,
      email,
      address,
      cardNumber,
      cardExpiry,
      cardCvv,
    });
    if (paymentResult.success) {
      // Redirect to payment success page
    } else {
      // Redirect to payment failure page
    }
  };

  return (
    <div className={styles.container}>
      <h1>Checkout</h1>
      <div className={styles.cart}>
        <h2>Your Cart</h2>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <img src={item.image} alt={item.name} />
            <div className={styles.itemDetails}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <div className={styles.quantity}>
                <button
                  onClick={() => handleUpdateCart(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleUpdateCart(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <button onClick={() => handleRemoveFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className={styles.payment}>
        <h2>Payment Information</h2>
        <form onSubmit={handleCheckout}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Expiry"
            value={cardExpiry}
            onChange={(e) => setCardExpiry(e.target.value)}
          />
          <input
            type="text"
            placeholder="CVV"
            value={cardCvv}
            onChange={(e) => setCardCvv(e.target.value)}
          />
          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
