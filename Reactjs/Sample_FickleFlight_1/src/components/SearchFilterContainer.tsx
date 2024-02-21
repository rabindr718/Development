import { FunctionComponent } from "react";
import BookingOptionsCard from "./BookingOptionsCard";
import styles from "./SearchFilterContainer.module.css";

const SearchFilterContainer: FunctionComponent = () => {
  return (
    <div className={styles.searchFilters}>
      <div className={styles.resultsSummary}>
        <div className={styles.results}>10 out of 177 Results</div>
        <img
          className={styles.resultsSummaryChild}
          alt=""
          src="/vector-2.svg"
        />
      </div>
      <BookingOptionsCard bookingOptionsText="Booking Options" />
      <BookingOptionsCard
        bookingOptionsText="Flight Experience"
        propTop="376.6px"
        propWidth="310.8px"
        propWidth1="198.04px"
      />
      <BookingOptionsCard
        bookingOptionsText="Airlines"
        propTop="561px"
        propWidth="181px"
        propWidth1="87.77px"
      />
      <BookingOptionsCard
        bookingOptionsText="Stops"
        propTop="86.2px"
        propWidth="296.62px"
        propWidth1="65.26px"
      />
      <img className={styles.seperatorIcon} alt="" src="/seperator.svg" />
    </div>
  );
};

export default SearchFilterContainer;
