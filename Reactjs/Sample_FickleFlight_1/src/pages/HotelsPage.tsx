import { FunctionComponent } from "react";
import Header from "../components/Header";
import LosAngelesContainer from "../components/LosAngelesContainer";
import HotelResultsContainer from "../components/HotelResultsContainer";
import WeeklyUpdatesContainer from "../components/WeeklyUpdatesContainer";
import styles from "./HotelsPage.module.css";

const HotelsPage: FunctionComponent = () => {
  return (
    <div className={styles.hotelsPage}>
      <Header />
      <LosAngelesContainer />
      <HotelResultsContainer />
      <WeeklyUpdatesContainer
        imageDimensions="/newsletter-section-background@2x.png"
        imageId="/logo.svg"
        thumbnailDimensions="/social-icons.svg"
      />
    </div>
  );
};

export default HotelsPage;
