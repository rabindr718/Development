import React from "react";
import styles from "./Product.module.css";

function Product({ id, title, image, price, rating }) {
  const addToBasket = () => {
    // Add item to basket logic
  };

  return (
    <div className={styles.product}>
      <div className={styles.info}>
        <p>{title}</p>
        <p className={styles.price}>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className={styles.rating}>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
      </div>
      <img height="290.78px" width="203px" src={image} alt={title} />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
