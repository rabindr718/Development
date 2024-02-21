import { FunctionComponent } from "react";
import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";
import styles from "./WeeklyUpdatesContainer.module.css";

export type WeeklyUpdatesContainerType = {
  imageDimensions?: string;
  imageId?: string;
  thumbnailDimensions?: string;
};

const WeeklyUpdatesContainer: FunctionComponent<WeeklyUpdatesContainerType> = ({
  imageDimensions,
  imageId,
  thumbnailDimensions,
}) => {
  return (
    <div className={styles.footerSection}>
      <div className={styles.subscribeSection}>
        <img
          className={styles.subscribeSectionBackground}
          alt=""
          src={imageDimensions}
        />
        <div className={styles.shareYourTravelsForm}>
          <div className={styles.formHeader}>
            <b className={styles.formTitleSubtext}>
              subscribe to our newsletter
            </b>
            <b className={styles.formTitle}>Get weekly updates</b>
          </div>
          <div className={styles.form}>
            <div className={styles.formText}>
              <div className={styles.fillInYour}>
                Fill in your details to join the party!
              </div>
            </div>
            <div className={styles.formFields}>
              <div className={styles.formText}>
                <TextField
                  className={styles.input}
                  color="primary"
                  label="Your name"
                  size="medium"
                  variant="outlined"
                  type="text"
                  sx={{ "& .MuiInputBase-root": { height: "56px" } }}
                />
              </div>
              <div className={styles.formText}>
                <TextField
                  className={styles.input}
                  color="primary"
                  label="Email address"
                  size="medium"
                  variant="outlined"
                  type="text"
                  sx={{ "& .MuiInputBase-root": { height: "56px" } }}
                />
              </div>
            </div>
            <button className={styles.button}>
              <div className={styles.unstyledbutton}>
                <div className={styles.button1}>submit</div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.fickleflightBio}>
          <img className={styles.logoIcon} alt="" src={imageId} />
          <div className={styles.fickleFlightIs}>
            Fickle Flight is your one-stop travel portal. We offer hassle free
            flight and hotel bookings. We also have all your flight needs in you
            online shop.
          </div>
          <img
            className={styles.socialIcons}
            alt=""
            src={thumbnailDimensions}
          />
        </div>
        <div className={styles.footerChild} />
        <div className={styles.footerLinks}>
          <div className={styles.company}>
            <div className={styles.aboutUs}>About Us</div>
            <div className={styles.company1}>Company</div>
            <div className={styles.news}>News</div>
            <div className={styles.careers}>Careers</div>
            <div className={styles.howWeWork}>How we work</div>
          </div>
          <div className={styles.company}>
            <div className={styles.account}>Account</div>
            <div className={styles.support1}>Support</div>
            <div className={styles.supportCenter}>Support Center</div>
            <div className={styles.faq}>FAQ</div>
            <div className={styles.accessibility}>Accessibility</div>
          </div>
          <div className={styles.more}>
            <div className={styles.covidAdvisory}>Covid Advisory</div>
            <div className={styles.more1}>More</div>
            <div className={styles.airlineFees}>Airline Fees</div>
            <div className={styles.tips}>Tips</div>
            <div className={styles.howWeWork}>Quarantine Rules</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WeeklyUpdatesContainer;
