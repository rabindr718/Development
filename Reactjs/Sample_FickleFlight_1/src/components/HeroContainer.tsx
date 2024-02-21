import { FunctionComponent, useCallback } from "react";
import { Radio, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormInputsRowContainer from "./FormInputsRowContainer";
import styles from "./HeroContainer.module.css";

const HeroContainer: FunctionComponent = () => {
  const navigate = useNavigate();

  const onSearchFlightsButtonClick = useCallback(() => {
    navigate("/results-page");
  }, [navigate]);

  const onSearchTextClick = useCallback(() => {
    navigate("/results-page");
  }, [navigate]);

  const onHotelsTextClick = useCallback(() => {
    navigate("/hotels-page");
  }, [navigate]);

  return (
    <div className={styles.heroSection}>
      <header className={styles.topHeader}>
        <div className={styles.topContainer}>
          <button className={styles.fickleflightLogo}>
            <img className={styles.symbolsIcon} alt="" src="/symbols.svg" />
          </button>
          <div className={styles.navigationRight}>
            <div className={styles.navigationMenu}>
              <button className={styles.explore}>Explore</button>
              <div className={styles.search} onClick={onSearchTextClick}>
                Search
              </div>
              <div className={styles.search} onClick={onHotelsTextClick}>
                Hotels
              </div>
              <button className={styles.offers}>Offers</button>
            </div>
            <div className={styles.accountSection}>
              <img
                className={styles.hamburgerMenuIcon}
                alt=""
                src="/notification.svg"
              />
              <img
                className={styles.notificationBellIcon}
                alt=""
                src="/notification1.svg"
              />
              <img
                className={styles.profilePictureIcon}
                alt=""
                src="/top_avatar@2x.png"
              />
            </div>
          </div>
        </div>
      </header>
      <div className={styles.searchSection}>
        <div className={styles.bannerGradient} />
        <img
          className={styles.bannerBackground}
          alt=""
          src="/banner--background@2x.png"
        />
        <div className={styles.searchContainer}>
          <div className={styles.title}>
            <div
              className={styles.letsExplore}
            >{`Let’s explore & travel the world`}</div>
            <div className={styles.findTheBest}>
              Find the best destinations and the most popular stays!
            </div>
          </div>
          <div className={styles.searchForm}>
            <div className={styles.formTitleGroup}>
              <b className={styles.searchFlights}>Search flights</b>
              <div className={styles.flightOptions}>
                <div className={styles.flightType}>
                  <FormControlLabel
                    className={styles.radio}
                    label="Return"
                    labelPlacement="end"
                    control={<Radio size="medium" />}
                  />
                  <FormControlLabel
                    className={styles.radio1}
                    label="One-way"
                    labelPlacement="end"
                    control={<Radio color="primary" checked size="medium" />}
                  />
                </div>
              </div>
            </div>
            <FormInputsRowContainer
              onSearchFlightsButtonClick={onSearchFlightsButtonClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContainer;
