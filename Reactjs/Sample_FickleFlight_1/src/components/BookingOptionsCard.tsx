import { FunctionComponent, useMemo, type CSSProperties } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import styles from "./BookingOptionsCard.module.css";

export type BookingOptionsCardType = {
  bookingOptionsText?: string;

  /** Style props */
  propTop?: CSSProperties["top"];
  propWidth?: CSSProperties["width"];
  propWidth1?: CSSProperties["width"];
};

const BookingOptionsCard: FunctionComponent<BookingOptionsCardType> = ({
  bookingOptionsText,
  propTop,
  propWidth,
  propWidth1,
}) => {
  const bookingOptionsStyle: CSSProperties = useMemo(() => {
    return {
      top: propTop,
      width: propWidth,
    };
  }, [propTop, propWidth]);

  const resultsStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth1,
    };
  }, [propWidth1]);

  return (
    <div className={styles.bookingOptions} style={bookingOptionsStyle}>
      <b className={styles.results} style={resultsStyle}>
        {bookingOptionsText}
      </b>
      <FormControlLabel
        className={styles.component1formcheckbox}
        label="Book on Fickleflight"
        labelPlacement="end"
        control={<Checkbox size="medium" />}
      />
      <FormControlLabel
        className={styles.component1formcheckbox1}
        label="Official Airline Websites"
        labelPlacement="end"
        control={<Checkbox size="medium" />}
      />
    </div>
  );
};

export default BookingOptionsCard;
