import React from "react";
import styles from "./ProductList.module.css";
import Product from "../Product";

function ProductList() {
  const products = [
    {
      id: 1,
      title: "Product 1",
      price: 29.99,
      rating: 4,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
    },
    {
      id: 2,
      title: "Product 2",
      price: 19.99,
      rating: 5,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
    },
    {
      id: 3,
      title: "Product 1",
      price: 39.99,
      rating: 4,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
    },
    {
      id: 4,
      title: "Product 2",
      price: 99.99,
      rating: 5,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg",
    },
    {
      id: 5,
      title: "Product 1",
      price: 29.99,
      rating: 4,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
    },
    {
      id: 6,
      title: "Product 1",
      price: 29.99,
      rating: 4,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
    },
    {
      id: 7,
      title: "Product 1",
      price: 29.99,
      rating: 4,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
    },
  ];

  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
}

export default ProductList;
