import { FunctionComponent } from "react";
import FormInputsRowContainer from "./FormInputsRowContainer";
import styles from "./SearchFormContainer.module.css";

const SearchFormContainer: FunctionComponent = () => {
  return (
    <div className={styles.searchFormSection}>
      <div className={styles.searchContainer}>
        <div className={styles.bannerGradient} />
        <img
          className={styles.bannerBackgroundIcon}
          alt=""
          src="/banner-background@2x.png"
        />
        <div className={styles.searchSection}>
          <div className={styles.title}>
            <div className={styles.whereAreYou}>Where are you off too?</div>
          </div>
          <FormInputsRowContainer
            propBorderRadius="10px 0px 0px 10px"
            propBackgroundColor="#fff"
            propPadding="20px"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFormContainer;
