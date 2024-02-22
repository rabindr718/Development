import styles from "./Text2.module.css";

const Text2 = () => {
  return (
    <div className={styles.text}>
      <div className={styles.text1} />
      <div className={styles.group} />
      <div className={styles.text2}>
        <h3 className={styles.exploreCampaignTemplatesContainer}>
          <p className={styles.exploreCampaignTemplates}>
            Explore Campaign Templates
          </p>
          <p className={styles.blankLine}>&nbsp;</p>
        </h3>
        <div className={styles.rectangleParent}>
          <img
            className={styles.frameChild}
            alt=""
            src="/rectangle-55@2x.png"
          />
          <div className={styles.text3}>
            <div className={styles.textChild} />
            <b className={styles.birthday}>Birthday</b>
            <div className={styles.thePizzaCafewillContainer}>
              <p className={styles.thePizzaCafewill}>
                The Pizza Cafe:Will you be our
              </p>
              <p className={styles.valentineenjoyANew}>
                Valentine?Enjoy a new outfit from
              </p>
              <p
                className={styles.thePizzaCafe}
              >{`The Pizza Cafe & pamper yourself`}</p>
              <p className={styles.with14Off}>with 14% OFF</p>
              <p className={styles.blankLine1}>&nbsp;</p>
              <p className={styles.call999999999}>Call #999999999</p>
              <p className={styles.blankLine2}>&nbsp;</p>
              <p className={styles.dontMissThis}>Don’t miss this!</p>
              <p className={styles.blankLine3}>&nbsp;</p>
              <p className={styles.clickHere}>
                <b>Click here</b>
              </p>
            </div>
          </div>
          <button className={styles.text4}>
            <div className={styles.textItem} />
            <b className={styles.thankYou}>Thank You!</b>
          </button>
          <div className={styles.rectangle}>
            <div className={styles.rectangleChild} />
            <img
              className={styles.frameIcon}
              loading="eager"
              alt=""
              src="/5101@2x.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Text2;
