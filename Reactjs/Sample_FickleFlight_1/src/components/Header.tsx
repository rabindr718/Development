import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header: FunctionComponent = () => {
  const navigate = useNavigate();

  const onFickleflightLogoContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onWebScreenClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onExploreTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onSearchTextClick = useCallback(() => {
    navigate("/results-page");
  }, [navigate]);

  return (
    <header className={styles.topHeader}>
      <div className={styles.topContainer}>
        <div
          className={styles.fickleflightLogo}
          onClick={onFickleflightLogoContainerClick}
        >
          <div className={styles.symbols}>
            <img
              className={styles.webScreenIcon}
              alt=""
              src="/webscreen.svg"
              onClick={onWebScreenClick}
            />
          </div>
        </div>
        <div className={styles.navigationRight}>
          <div className={styles.navigationMenu}>
            <div className={styles.explore} onClick={onExploreTextClick}>
              Explore
            </div>
            <div className={styles.explore} onClick={onSearchTextClick}>
              Search
            </div>
            <button className={styles.hotels}>Hotels</button>
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
              className={styles.unsplashd1upkifd04aIcon}
              alt=""
              src="/top_avatar@2x.png"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
