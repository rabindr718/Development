import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FlightSectionContainer.module.css";

const FlightSectionContainer: FunctionComponent = () => {
  const navigate = useNavigate();

  const onHotelClick = useCallback(() => {
    navigate("/hotels-page");
  }, [navigate]);

  return (
    <div className={styles.upcomingFlightSection}>
      <b className={styles.upcomingFlight}>Upcoming Flight</b>
      <div className={styles.flightDetails}>
        <div className={styles.flightMainContainer}>
          <div className={styles.toAndFrom}>
            <div className={styles.fromDetails}>
              <b className={styles.sin}>SIN</b>
              <div className={styles.singapore}>Singapore</div>
            </div>
            <div className={styles.duration}>
              <b className={styles.h55m}>15H 55M</b>
              <img
                className={styles.flightIcons}
                alt=""
                src="/flight-icons.svg"
              />
            </div>
            <div className={styles.toDetails}>
              <b className={styles.lax}>LAX</b>
              <div className={styles.losAngeles}>Los Angeles</div>
            </div>
          </div>
          <div className={styles.horizontalLine} />
          <div className={styles.departureDetails}>
            <div className={styles.departsOn1}>Departs on: 1 May, 08:00 AM</div>
            <div className={styles.daysToGoContainer}>
              <b>4 days</b>
              <span> to go</span>
            </div>
          </div>
        </div>
        <div className={styles.lineSeparator} />
        <div className={styles.prepareMenu}>
          <div className={styles.prepareForYour}>Prepare for your trip</div>
          <div className={styles.tripMenus}>
            <button className={styles.hotel} onClick={onHotelClick}>
              <img className={styles.hotelIcon} alt="" src="/hotel-icon.svg" />
              <div className={styles.hotel1}>Hotel</div>
            </button>
            <button className={styles.hotel}>
              <div className={styles.hotelIcon}>
                <div className={styles.background} />
                <img className={styles.ticketIcon} alt="" src="/ticket.svg" />
              </div>
              <div className={styles.attractions1}>Attractions</div>
            </button>
            <button className={styles.hotel}>
              <img className={styles.hotelIcon} alt="" src="/eats-icon.svg" />
              <div className={styles.attractions1}>Eats</div>
            </button>
            <button className={styles.hotel}>
              <div className={styles.hotelIcon}>
                <div className={styles.background1} />
                <img className={styles.trainIcon} alt="" src="/train.svg" />
              </div>
              <div className={styles.attractions1}>Commute</div>
            </button>
            <button className={styles.hotel}>
              <div className={styles.taxiIcon}>
                <div className={styles.background2} />
                <img className={styles.taxiIcon1} alt="" src="/taxi.svg" />
              </div>
              <div className={styles.taxi1}>Taxi</div>
            </button>
            <button className={styles.hotel}>
              <div className={styles.hotelIcon}>
                <div className={styles.background3} />
                <img className={styles.movieIcon} alt="" src="/movie.svg" />
              </div>
              <div className={styles.attractions1}>Movies</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSectionContainer;
