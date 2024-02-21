import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./DestinationContainer.module.css";

export type DestinationContainerType = {
  destinationName?: string;
  destinationPrice?: string;
  destinationImageUrl?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propDisplay?: CSSProperties["display"];
  propWidth1?: CSSProperties["width"];
  propLeft?: CSSProperties["left"];
};

const DestinationContainer: FunctionComponent<DestinationContainerType> = ({
  destinationName,
  destinationPrice,
  destinationImageUrl,
  propWidth,
  propDisplay,
  propWidth1,
  propLeft,
}) => {
  const detailsStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const divStyle: CSSProperties = useMemo(() => {
    return {
      display: propDisplay,
      width: propWidth1,
    };
  }, [propDisplay, propWidth1]);

  const fromStyle: CSSProperties = useMemo(() => {
    return {
      left: propLeft,
    };
  }, [propLeft]);

  return (
    <button className={styles.col1}>
      <div className={styles.pariscard}>
        <img className={styles.parisimageIcon} alt="" src={destinationName} />
        <div className={styles.destinationDetails}>
          <b className={styles.paris}>{destinationPrice}</b>
          <div className={styles.details} style={detailsStyle}>
            <div className={styles.div} style={divStyle}>
              {destinationImageUrl}
            </div>
            <div className={styles.from} style={fromStyle}>
              from
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default DestinationContainer;
