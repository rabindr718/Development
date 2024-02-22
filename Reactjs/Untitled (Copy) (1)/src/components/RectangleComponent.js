import styles from "./RectangleComponent.module.css";

const RectangleComponent = () => {
  return (
    <div className={styles.rectangleWrapper}>
      <div className={styles.componentChild} />
    </div>
  );
};

export default RectangleComponent;
