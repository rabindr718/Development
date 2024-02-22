import TextBlock from "./TextBlock";
import styles from "./Text1.module.css";

const Text1 = () => {
  return (
    <section className={styles.text}>
      <div className={styles.vectorParent}>
        <div className={styles.vector}>
          <img className={styles.image1Icon} alt="" src="/image-1@2x.png" />
          <div className={styles.rectangle}>
            <div className={styles.groupParent}>
              <div className={styles.group}>
                <img className={styles.textIcon} alt="" src="/text.svg" />
                <img className={styles.textIcon1} alt="" src="/text.svg" />
                <img className={styles.textIcon2} alt="" src="/text.svg" />
                <img className={styles.textIcon3} alt="" src="/text.svg" />
                <img className={styles.textIcon4} alt="" src="/text.svg" />
              </div>
              <div className={styles.path}>
                <b className={styles.kRatings}>5 • 6.7K Ratings</b>
              </div>
            </div>
          </div>
          <div className={styles.frameParent}>
            <img className={styles.frameIcon} alt="" src="/frame-39.svg" />
            <div className={styles.availableOnIos}>
              Available on iOS and Android
            </div>
          </div>
        </div>
        <div className={styles.vectorShape}>
          <h1 className={styles.whyBusinessesLikeContainer}>
            <p className={styles.whyBusinessesLike}>
              Why businesses like yours
            </p>
            <p className={styles.thinkWereTheBest}>
              <span>{`think `}</span>
              <span className={styles.wereTheBest}>we’re the best!</span>
            </p>
          </h1>
          <div className={styles.frameGrid}>
            <TextBlock />
            <TextBlock />
            <TextBlock />
          </div>
          <div className={styles.rectangleWrapper}>
            <div className={styles.rectangle1}>
              <div className={styles.groupWrapper}>
                <div className={styles.group1}>
                  <div className={styles.catering}>
                    <img
                      className={styles.cateringChild}
                      loading="eager"
                      alt=""
                      src="/group-111.svg"
                    />
                  </div>
                  <div className={styles.eventManagement}>
                    <div className={styles.eventManagement1}>
                      <h1 className={styles.ourSolutionFitsContainer}>
                        <span>{`Our `}</span>
                        <span className={styles.solution}>Solution</span>
                        <span> Fits your Industry</span>
                      </h1>
                    </div>
                    <img
                      className={styles.resortsIcon}
                      alt=""
                      src="/vector-9.svg"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.banquets}>
                <div className={styles.frameGridParent}>
                  <div className={styles.frameGrid1}>
                    <div className={styles.frameGridChild} />
                    <img
                      className={styles.frameIcon1}
                      loading="eager"
                      alt=""
                      src="/frame-40.svg"
                    />
                    <div className={styles.eventManagement2}>
                      <h1 className={styles.catering1}>Catering</h1>
                    </div>
                  </div>
                  <div className={styles.rectangleParent}>
                    <div className={styles.frameChild} />
                    <img
                      className={styles.eventManagementIcon}
                      loading="eager"
                      alt=""
                      src="/frame-41.svg"
                    />
                    <h1 className={styles.banquets1}>Banquets</h1>
                  </div>
                </div>
                <div className={styles.frameGroup}>
                  <div className={styles.rectangleGroup}>
                    <div className={styles.frameItem} />
                    <img
                      className={styles.frameIcon2}
                      loading="eager"
                      alt=""
                      src="/frame-42.svg"
                    />
                    <h1 className={styles.resorts}>Resorts</h1>
                  </div>
                  <button className={styles.rectangleContainer}>
                    <div className={styles.frameInner} />
                    <img
                      className={styles.frameIcon3}
                      alt=""
                      src="/frame-43.svg"
                    />
                    <div className={styles.eventManagementWrapper}>
                      <b className={styles.eventManagement3}>
                        Event Management
                      </b>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Text1;
