import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./FlightContainer.module.css";

export type FlightContainerType = {
  flightDetails?: string;
  airlineName?: string;
  departureTime?: string;
  flightDuration?: string;
  arrivalTime?: string;
  flightPrice?: string;

  /** Style props */
  propTextAlign?: CSSProperties["textAlign"];
  propWidth?: CSSProperties["width"];
};

const FlightContainer: FunctionComponent<FlightContainerType> = ({
  flightDetails,
  airlineName,
  departureTime,
  flightDuration,
  arrivalTime,
  flightPrice,
  propTextAlign,
  propWidth,
}) => {
  const singaporeAirlines1Style: CSSProperties = useMemo(() => {
    return {
      textAlign: propTextAlign,
      width: propWidth,
    };
  }, [propTextAlign, propWidth]);

  return (
    <div className={styles.flightCard}>
      <div className={styles.airlineSection}>
        <img className={styles.siaIcon} alt="" src={flightDetails} />
        <div
          className={styles.singaporeAirlines}
          style={singaporeAirlines1Style}
        >
          {airlineName}
        </div>
      </div>
      <div className={styles.flightDetailsSection}>
        <div className={styles.departureDetails}>
          <div className={styles.am}>{departureTime}</div>
          <div className={styles.sin}>SIN</div>
        </div>
        <div className={styles.flightduration}>
          <img className={styles.flighticon} alt="" src="/flighticon.svg" />
          <div className={styles.h55mNonStop}>{flightDuration}</div>
        </div>
        <div className={styles.arrivalDetails}>
          <div className={styles.am}>{arrivalTime}</div>
          <div className={styles.sin1}>LAX</div>
        </div>
      </div>
      <div className={styles.priceSection}>
        <img className={styles.priceSectionChild} alt="" src="/vector-1.svg" />
        <b className={styles.s730}>{flightPrice}</b>
      </div>
    </div>
  );
};

export default FlightContainer;
