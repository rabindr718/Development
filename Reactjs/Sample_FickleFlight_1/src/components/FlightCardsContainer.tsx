import { FunctionComponent } from "react";
import FlightInfoContainer from "./FlightInfoContainer";
import FlightContainer from "./FlightContainer";
import styles from "./FlightCardsContainer.module.css";

const FlightCardsContainer: FunctionComponent = () => {
  return (
    <div className={styles.flightCards}>
      <FlightInfoContainer
        flightDetails="/turkish.svg"
        airlineName="Turkish Airlines"
        departureTime="11:35 PM"
        flightNumber="/flighticon.svg"
        flightDuration="33H 10M, 1-stop"
        arrivalTime="4:45 PM"
        flightPrice="S$ 723"
      />
      <FlightContainer
        flightDetails="/sia.svg"
        airlineName="Singapore Airlines"
        departureTime="8:45 PM"
        flightDuration="15H 10M, 2-stops"
        arrivalTime="7:55 PM"
        flightPrice="S$ 900"
      />
      <FlightInfoContainer
        flightDetails="/japan.svg"
        airlineName="Japan Airlines"
        departureTime="8:20 PM"
        flightNumber="/flighticon.svg"
        flightDuration="17H 30M, 1-stop"
        arrivalTime="9:50 PM"
        flightPrice="S$ 859"
        propTransform="scale(0.8)"
        propTextAlign="left"
        propRight="6.33%"
        propLeft="5.15%"
      />
      <FlightInfoContainer
        flightDetails="/ana.svg"
        airlineName="ANA"
        departureTime="6:35 PM"
        flightNumber="/flighticon.svg"
        flightDuration="19H 15M, 1-stop"
        arrivalTime="9:50 PM"
        flightPrice="S$ 936"
        propTransform="scale(0.8)"
        propTextAlign="left"
        propRight="5.5%"
        propLeft="5.98%"
      />
      <FlightInfoContainer
        flightDetails="/americanairlines.svg"
        airlineName="American Airlines"
        departureTime="8:20 PM"
        flightNumber="/flighticon.svg"
        flightDuration="17H 30M, 1-stop"
        arrivalTime="9:50 AM"
        flightPrice="S$ 939"
        propTransform="unset"
        propTextAlign="center"
        propRight="5.5%"
        propLeft="5.98%"
      />
      <FlightContainer
        flightDetails="/turkish.svg"
        airlineName="Turkish Airlines"
        departureTime="11:35 PM"
        flightDuration="33H 10M, 2-stops"
        arrivalTime="4:45 PM"
        flightPrice="S$ 673"
        propTextAlign="left"
        propWidth="unset"
      />
      <FlightInfoContainer
        flightDetails="/japan.svg"
        airlineName="Japan Airlines"
        departureTime="10:25 PM"
        flightNumber="/flighticon.svg"
        flightDuration="26H 45M, 1-stop"
        arrivalTime="9:10 AM"
        flightPrice="S$ 859"
        propTransform="scale(0.8)"
        propTextAlign="left"
        propRight="5.5%"
        propLeft="5.98%"
      />
      <FlightInfoContainer
        flightDetails="/americanairlines.svg"
        airlineName="American Airlines"
        departureTime="10:25 PM"
        flightNumber="/flighticon.svg"
        flightDuration="26H 45M, 1-stop"
        arrivalTime="9:10 AM"
        flightPrice="S$ 859"
        propTransform="unset"
        propTextAlign="center"
        propRight="5.5%"
        propLeft="5.98%"
      />
      <button className={styles.primaryButton}>
        <div className={styles.primaryButtonChild} />
        <div className={styles.searchFlights}>Show more results</div>
      </button>
    </div>
  );
};

export default FlightCardsContainer;
