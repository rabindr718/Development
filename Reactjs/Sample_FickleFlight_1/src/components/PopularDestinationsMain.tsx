import { FunctionComponent } from "react";
import DestinationContainer from "./DestinationContainer";
import styles from "./PopularDestinationsMain.module.css";

const PopularDestinationsMain: FunctionComponent = () => {
  return (
    <div className={styles.popDestinationsMain}>
      <div className={styles.destinationsTitles}>
        <div className={styles.titleContainer}>
          <b className={styles.planYourNext}>Plan your next trip</b>
          <b className={styles.mostPopularDestinations}>
            Most Popular Destinations
          </b>
        </div>
        <button className={styles.viewAllTop}>
          <div className={styles.viewAllDestinations}>
            View all destinations
          </div>
          <img className={styles.arrowRightIcon} alt="" src="/arrowright.svg" />
        </button>
      </div>
      <div className={styles.cardsContainer}>
        <DestinationContainer
          destinationName="/parisimage@2x.png"
          destinationPrice="Paris"
          destinationImageUrl="$699"
        />
        <DestinationContainer
          destinationName="/greeceimage@2x.png"
          destinationPrice="Greece"
          destinationImageUrl="$1079"
          propWidth="99.92px"
          propDisplay="inline-block"
          propWidth1="unset"
          propLeft="47.39px"
        />
        <DestinationContainer
          destinationName="/norwayimage@2x.png"
          destinationPrice="Norway"
          destinationImageUrl="$895"
          propWidth="90.92px"
          propDisplay="inline-block"
          propWidth1="90.92px"
          propLeft="38.39px"
        />
        <DestinationContainer
          destinationName="/tuscanyimage@2x.png"
          destinationPrice="Tuscany"
          destinationImageUrl="$1245"
          propWidth="100.62px"
          propDisplay="inline-block"
          propWidth1="100.62px"
          propLeft="48.09px"
        />
      </div>
      <div className={styles.viewAllBottom}>
        <div className={styles.viewAllDestinations1}>View all destinations</div>
        <img className={styles.arrowRightIcon} alt="" src="/arrowright.svg" />
      </div>
    </div>
  );
};

export default PopularDestinationsMain;
