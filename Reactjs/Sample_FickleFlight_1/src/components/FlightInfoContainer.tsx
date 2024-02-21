import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./FlightInfoContainer.module.css";

export type FlightInfoContainerType = {
  flightDetails?: string;
  airlineName?: string;
  departureTime?: string;
  flightNumber?: string;
  flightDuration?: string;
  arrivalTime?: string;
  flightPrice?: string;

  /** Style props */
  propTransform?: CSSProperties["transform"];
  propTextAlign?: CSSProperties["textAlign"];
  propRight?: CSSProperties["right"];
  propLeft?: CSSProperties["left"];
};

const FlightInfoContainer: FunctionComponent<FlightInfoContainerType> = ({
  flightDetails,
  airlineName,
  departureTime,
  flightNumber,
  flightDuration,
  arrivalTime,
  flightPrice,
  propTransform,
  propTextAlign,
  propRight,
  propLeft,
}) => {
  const turkishIconStyle: CSSProperties = useMemo(() => {
    return {
      transform: propTransform,
    };
  }, [propTransform]);

  const singaporeAirlinesStyle: CSSProperties = useMemo(() => {
    return {
      textAlign: propTextAlign,
    };
  }, [propTextAlign]);

  const flightIconStyle: CSSProperties = useMemo(() => {
    return {
      right: propRight,
      left: propLeft,
    };
  }, [propRight, propLeft]);

  return (
    <div className={styles.flightCard}>
      <div className={styles.airlineSection}>
        <img
          className={styles.turkishIcon}
          alt=""
          src={flightDetails}
          style={turkishIconStyle}
        />
        <div
          className={styles.singaporeAirlines}
          style={singaporeAirlinesStyle}
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
          <img
            className={styles.flighticon}
            alt=""
            src={flightNumber}
            style={flightIconStyle}
          />
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

export default FlightInfoContainer;
