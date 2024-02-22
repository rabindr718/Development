import styles from "./FrameComponent1.module.css";

const FrameComponent1 = () => {
  return (
    <div className={styles.vectorParent}>
      <div className={styles.vector} />
      <div className={styles.ourSolutionFitsYourIndustr}>
        <h1 className={styles.startForFreeContainer}>
          <p className={styles.startForFree}>
            <span className={styles.startFor}>{`Start for `}</span>
            <span className={styles.free}>free</span>
            <span>,</span>
          </p>
          <p className={styles.growForReal}>
            <span>{`grow for `}</span>
            <span className={styles.real}>real</span>
          </p>
        </h1>
      </div>
      <div className={styles.frameCatering}>
        <div className={styles.frameBanquets}>
          <button className={styles.group}>
            <div className={styles.groupChild} />
            <b className={styles.startFreeTrial}>Start Free Trial</b>
          </button>
          <div className={styles.subscribe}>
            <div className={styles.noCreditCard}>No credit card required</div>
            <div className={styles.termsApply}>Terms Apply</div>
          </div>
        </div>
      </div>
      <img
        className={styles.productLoyaltyCampaignsInsi}
        loading="eager"
        alt=""
        src="/frame-4.svg"
      />
    </div>
  );
};

export default FrameComponent1;
