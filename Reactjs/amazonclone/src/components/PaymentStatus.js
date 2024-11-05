import React from "react";
import styles from "./PaymentStatus.module.css";

function PaymentStatus({ status }) {
  return (
    <div className={styles.status}>
      {status === "success" ? (
        <h2>Payment Successful</h2>
      ) : (
        <h2>Payment Failed</h2>
      )}
    </div>
  );
}

export default PaymentStatus;
