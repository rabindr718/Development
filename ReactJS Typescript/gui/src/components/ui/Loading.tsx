import React from "react";
import styles from "./Loading.module.css";

interface LoadingProps {
  type?: "spinner" | "dots" | "pulse";
  size?: "small" | "medium" | "large";
  overlay?: boolean;
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  type = "spinner",
  size = "medium",
  overlay = false,
  text,
}) => {
  const containerClasses = [styles.loadingContainer, overlay && styles.overlay]
    .filter(Boolean)
    .join(" ");

  const renderLoader = () => {
    switch (type) {
      case "dots":
        return (
          <div className={styles.dots}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        );
      case "pulse":
        return <div className={styles.pulse}></div>;
      default:
        return (
          <div
            className={`${styles.spinner} ${
              styles[`spinner${size.charAt(0).toUpperCase() + size.slice(1)}`]
            }`}
          ></div>
        );
    }
  };

  return (
    <div className={containerClasses}>
      <div>
        {renderLoader()}
        {text && <div className={styles.loadingText}>{text}</div>}
      </div>
    </div>
  );
};
