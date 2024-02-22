import styles from "./TextBlock.module.css";

const TextBlock = () => {
  return (
    <div className={styles.textBlock}>
      <div className={styles.textBlockChild} />
      <div className={styles.textBlockInner}>
        <div className={styles.kevin1Parent}>
          <img
            className={styles.kevin1Icon}
            loading="eager"
            alt=""
            src="/kevin-1@2x.png"
          />
          <div className={styles.frameWrapper}>
            <div className={styles.kevinPatelParent}>
              <h3 className={styles.kevinPatel}>Kevin Patel</h3>
              <div className={styles.kevinPvtLtd}>Kevin PVT. LTD.</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.withMostSystemsYouGet70Wrapper}>
        <div className={styles.withMostSystemsContainer}>
          <p className={styles.withMostSystems}>"With most systems,</p>
          <p className={styles.youGet70}>you get 70% of what you hoped.</p>
          <p className={styles.withOdooYou}>
            With Odoo, you get more than what
          </p>
          <p className={styles.youExpectedYou}>you expected. You, guys,</p>
          <p className={styles.willTransformThe}>will transform the market."</p>
        </div>
      </div>
      <div className={styles.kevinPatelGroup}>
        <h3 className={styles.kevinPatel1}>Kevin Patel</h3>
        <div className={styles.kevinPvtLtd1}>Kevin PVT. LTD.</div>
      </div>
    </div>
  );
};

export default TextBlock;
