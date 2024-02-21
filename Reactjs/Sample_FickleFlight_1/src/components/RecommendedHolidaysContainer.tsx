import { FunctionComponent } from "react";
import RecommendedHolidayCardContaine from "./RecommendedHolidayCardContaine";
import styles from "./RecommendedHolidaysContainer.module.css";

const RecommendedHolidaysContainer: FunctionComponent = () => {
  return (
    <div className={styles.recommendedHolidaysContainer}>
      <div className={styles.recTitle}>
        <b className={styles.recommendedHolidays}>Recommended Holidays</b>
        <button className={styles.viewAllHolidaysParent}>
          <div className={styles.viewAllHolidays}>View all holidays</div>
          <img className={styles.arrowRightIcon} alt="" src="/arrowright.svg" />
        </button>
      </div>
      <div className={styles.recCardsContainer}>
        <RecommendedHolidayCardContaine
          packageName="/unsplash5mv818tzxeo@2x.png"
          packageDestination="Bali"
          packageDuration="4D3N"
          packagePrice="$899"
        />
        <RecommendedHolidayCardContaine
          packageName="/switzerlandimage@2x.png"
          packageDestination="Swiss"
          packageDuration="6D5N"
          packagePrice="$900"
        />
        <RecommendedHolidayCardContaine
          packageName="/boracayimage@2x.png"
          packageDestination="Boracay"
          packageDuration="5D4N"
          packagePrice="$699"
        />
        <RecommendedHolidayCardContaine
          packageName="/palawanimage@2x.png"
          packageDestination="Palawan"
          packageDuration="4D3N"
          packagePrice="$789"
        />
      </div>
      <div className={styles.viewAllBottom}>
        <div className={styles.viewAllHolidays1}>View all holidays</div>
        <img className={styles.arrowRightIcon} alt="" src="/arrowright.svg" />
      </div>
    </div>
  );
};

export default RecommendedHolidaysContainer;
