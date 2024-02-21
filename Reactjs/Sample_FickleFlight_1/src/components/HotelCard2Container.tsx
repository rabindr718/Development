import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./HotelCard2Container.module.css";

export type HotelCard2ContainerType = {
  roomDescription?: string;
  roomType?: string;
  roomPrice?: string;
  roomReviews?: string;
  hotelName?: string;
  roomRating?: string;
  roomCoordinates?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propRight?: CSSProperties["right"];
};

const HotelCard2Container: FunctionComponent<HotelCard2ContainerType> = ({
  roomDescription,
  roomType,
  roomPrice,
  roomReviews,
  hotelName,
  roomRating,
  roomCoordinates,
  propWidth,
  propRight,
}) => {
  const vectorIconStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
      right: propRight,
    };
  }, [propWidth, propRight]);

  return (
    <div className={styles.hotelCard2}>
      <div className={styles.hotelCard}>
        <img
          className={styles.discoveryShoresImage}
          alt=""
          src={roomDescription}
        />
        <div className={styles.stayDetails}>
          <div className={styles.stayDetailsRows}>
            <div className={styles.storyBeachfrontSuite}>{roomType}</div>
            <b className={styles.discoveryShores}>{roomPrice}</b>
            <div className={styles.night}>{roomReviews}</div>
          </div>
        </div>
        <div className={styles.rating}>
          <div className={styles.reviews}>{hotelName}</div>
          <div className={styles.parent}>
            <div className={styles.div}>{roomRating}</div>
            <img
              className={styles.vectorIcon}
              alt=""
              src={roomCoordinates}
              style={vectorIconStyle}
            />
          </div>
        </div>
        <div className={styles.moreDetailsButton}>
          <div className={styles.button}>More details</div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard2Container;
