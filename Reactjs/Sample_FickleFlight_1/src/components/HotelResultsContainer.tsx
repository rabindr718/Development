import { FunctionComponent } from "react";
import ResultsWrapper from "./ResultsWrapper";
import ResultsContainer from "./ResultsContainer";
import styles from "./HotelResultsContainer.module.css";

const HotelResultsContainer: FunctionComponent = () => {
  return (
    <div className={styles.hotelResults}>
      <div className={styles.resultsSumamry}>
        <div className={styles.results}>200+ results</div>
        <div className={styles.filters}>
          <img className={styles.filtersIcon} alt="" src="/filters.svg" />
          <div className={styles.filters1}>Filters</div>
        </div>
      </div>
      <div className={styles.resultsSection}>
        <div className={styles.resultCardsCol}>
          <ResultsWrapper
            roomImageUrl="/results-image@2x.png"
            roomType="1 king bed standard"
            hotelName="Holiday Inn Expre..."
            roomPrice="/vector.svg"
            roomSize="/video.svg"
          />
          <ResultsContainer
            hotelImageUrl="/results-image@2x.png"
            hotelName="Freehand Los Angeles"
            roomType="Bed in Quad"
            reviewCount="(1,941 reviews)"
            rating="4.2"
            price="/vector.svg"
            discountPrice="$S 198"
          />
          <ResultsContainer
            hotelImageUrl="/results-image@2x.png"
            hotelName="The Westin Bonavent..."
            roomType="1 King, City view"
            reviewCount="(1,002 reviews)"
            rating="4.1"
            price="/vector.svg"
            discountPrice="$S 289"
          />
          <ResultsWrapper
            roomImageUrl="/results-image@2x.png"
            roomType="Deluxe King"
            hotelName="The Ritz-Carlton, L..."
            roomPrice="/vector.svg"
            roomSize="/feature-video.svg"
          />
          <iframe
            className={styles.map}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=-118.56033325195314%2C33.837912419023645%2C-117.98355102539064%2C34.25948651450623&amp;layer=mapnik`}
          />
        </div>
        <iframe
          className={styles.map1}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=-118.56033325195314%2C33.837912419023645%2C-117.98355102539064%2C34.25948651450623&amp;layer=mapnik`}
        />
      </div>
    </div>
  );
};

export default HotelResultsContainer;
