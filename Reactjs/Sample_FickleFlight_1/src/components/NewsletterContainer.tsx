import { FunctionComponent } from "react";
import WeeklyUpdatesContainer from "./WeeklyUpdatesContainer";
import styles from "./NewsletterContainer.module.css";

const NewsletterContainer: FunctionComponent = () => {
  return (
    <div className={styles.footerSection}>
      <WeeklyUpdatesContainer
        imageDimensions="/newsletter-section-background@2x.png"
        imageId="/logo.svg"
        thumbnailDimensions="/social-icons.svg"
      />
    </div>
  );
};

export default NewsletterContainer;
