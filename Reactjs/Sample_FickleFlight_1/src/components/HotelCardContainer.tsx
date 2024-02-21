import { FunctionComponent, useState, useCallback } from "react";
import MatterhornPopup from "./MatterhornPopup";
import PortalPopup from "./PortalPopup";
import styles from "./HotelCardContainer.module.css";

export type HotelCardContainerType = {
  roomDescription?: string;
  roomType?: string;
  hotelName?: string;
  roomPrice?: string;
  roomReviews?: string;
  hotelReviews?: string;
  roomRating?: string;
  roomImageUrl?: string;
};

const HotelCardContainer: FunctionComponent<HotelCardContainerType> = ({
  roomDescription,
  roomType,
  hotelName,
  roomPrice,
  roomReviews,
  hotelReviews,
  roomRating,
  roomImageUrl,
}) => {
  const [isMatterhornPopupOpen, setMatterhornPopupOpen] = useState(false);

  const openMatterhornPopup = useCallback(() => {
    setMatterhornPopupOpen(true);
  }, []);

  const closeMatterhornPopup = useCallback(() => {
    setMatterhornPopupOpen(false);
  }, []);

  return (
    <>
      <div className={styles.hotelCard1}>
        <div className={styles.hotelCard}>
          <img
            className={styles.matterhornSuitesImage}
            alt=""
            src={roomDescription}
          />
          <div className={styles.stayDetails}>
            <div className={styles.stayDetailsRows}>
              <div className={styles.entireBungalow}>{roomType}</div>
              <b className={styles.matterhornSuites}>{hotelName}</b>
              <div className={styles.night}>{roomPrice}</div>
            </div>
            <img
              className={styles.videoIcon}
              alt=""
              src={roomReviews}
              onClick={openMatterhornPopup}
            />
          </div>
          <div className={styles.rating}>
            <div className={styles.reviews}>{hotelReviews}</div>
            <div className={styles.parent}>
              <div className={styles.div}>{roomRating}</div>
              <img className={styles.vectorIcon} alt="" src={roomImageUrl} />
            </div>
          </div>
          <div className={styles.moreDetailsButton}>
            <div className={styles.button}>More details</div>
          </div>
        </div>
      </div>
      {isMatterhornPopupOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.3)"
          placement="Centered"
          onOutsideClick={closeMatterhornPopup}
        >
          <MatterhornPopup onClose={closeMatterhornPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default HotelCardContainer;
