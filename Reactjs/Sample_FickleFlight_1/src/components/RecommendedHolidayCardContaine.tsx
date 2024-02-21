import { FunctionComponent } from "react";
import styles from "./RecommendedHolidayCardContaine.module.css";

export type RecommendedHolidayCardContaineType = {
  packageName?: string;
  packageDestination?: string;
  packageDuration?: string;
  packagePrice?: string;
};

const RecommendedHolidayCardContaine: FunctionComponent<
  RecommendedHolidayCardContaineType
> = ({ packageName, packageDestination, packageDuration, packagePrice }) => {
  return (
    <button className={styles.recCard1}>
      <img
        className={styles.unsplash5mv818tzxeoIcon}
        alt=""
        src={packageName}
      />
      <div className={styles.holidayDetails}>
        <div className={styles.frameParent}>
          <div className={styles.baliParent}>
            <div className={styles.bali}>{packageDestination}</div>
            <div className={styles.d3n}>{packageDuration}</div>
          </div>
          <div className={styles.div}>{packagePrice}</div>
        </div>
      </div>
    </button>
  );
};

export default RecommendedHolidayCardContaine;
