import { FunctionComponent } from "react";
import HeroContainer from "../components/HeroContainer";
import FlightSectionContainer from "../components/FlightSectionContainer";
import PopularDestinationsMain from "../components/PopularDestinationsMain";
import RecommendedHolidaysContainer from "../components/RecommendedHolidaysContainer";
import PopularStaysForm from "../components/PopularStaysForm";
import WeeklyUpdatesContainer from "../components/WeeklyUpdatesContainer";
import styles from "./Homepage.module.css";

const Homepage: FunctionComponent = () => {
  return (
    <div className={styles.homepage}>
      <HeroContainer />
      <div className={styles.homeContents}>
        <FlightSectionContainer />
        <PopularDestinationsMain />
        <RecommendedHolidaysContainer />
        <PopularStaysForm />
      </div>
      <WeeklyUpdatesContainer
        imageDimensions="/subscribe-section-background@2x.png"
        imageId="/logo.svg"
        thumbnailDimensions="/social-icons.svg"
      />
    </div>
  );
};

export default Homepage;
