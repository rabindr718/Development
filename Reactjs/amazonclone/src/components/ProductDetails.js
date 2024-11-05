import React from "react";
import styles from "./ProductDetail.module.css";

function ProductDetail({ product }) {
  return (
    <div className={styles.detail}>
      <img src={product.image} alt={product.title} />
      <div className={styles.info}>
        <h2>{product.title}</h2>
        <p className={styles.price}>${product.price}</p>
        <button>Add to Basket</button>
      </div>
    </div>
  );
}

export default ProductDetail;
