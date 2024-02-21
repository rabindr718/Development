import { FunctionComponent } from "react";
import styles from "./ResultsContainer.module.css";

export type ResultsContainerType = {
  hotelImageUrl?: string;
  hotelName?: string;
  roomType?: string;
  reviewCount?: string;
  rating?: string;
  price?: string;
  discountPrice?: string;
};

const ResultsContainer: FunctionComponent<ResultsContainerType> = ({
  hotelImageUrl,
  hotelName,
  roomType,
  reviewCount,
  rating,
  price,
  discountPrice,
}) => {
  return (
    <div className={styles.resultsCard}>
      <img className={styles.resultsImageIcon} alt="" src={hotelImageUrl} />
      <div className={styles.resultsDetails}>
        <div className={styles.resultsTitle}>
          <div className={styles.result}>
            <b className={styles.freehandLosAngeles}>{hotelName}</b>
            <div className={styles.bedInQuad}>{roomType}</div>
            <div className={styles.review}>
              <div className={styles.reviews}>{reviewCount}</div>
              <div className={styles.stars}>
                <div className={styles.div}>{rating}</div>
                <img className={styles.vectorIcon} alt="" src={price} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.priceAndCta}>
          <div className={styles.pricing}>
            <b className={styles.s198}>{discountPrice}</b>
            <div className={styles.night}>/night</div>
          </div>
          <button className={styles.viewDetailsButton}>
            <div className={styles.viewDetailsButtonChild} />
            <div className={styles.searchFlights}>View Details</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsContainer;
