
import React from "react";
import { COMPANY_INFO } from "../../utils/constants";
import styles from "./Hero.module.css";

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.floatingElements}>
          <div className={styles.floatingElement}></div>
          <div className={styles.floatingElement}></div>
          <div className={styles.floatingElement}></div>
        </div>
      </div>

      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Building the Future of
              <span className={styles.highlight}> European Software</span>
            </h1>
            <p className={styles.heroSubtitle}>{COMPANY_INFO.description}</p>
            <div className={styles.heroButtons}>
              <button className={styles.primaryButton}>
                Start Your Project
              </button>
              <button className={styles.secondaryButton}>View Our Work</button>
            </div>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <h3>{COMPANY_INFO.projects}</h3>
              <p>Projects Completed</p>
            </div>
            <div className={styles.heroStat}>
              <h3>{COMPANY_INFO.countries}</h3>
              <p>EU Countries Served</p>
            </div>
            <div className={styles.heroStat}>
              <h3>{COMPANY_INFO.employees}</h3>
              <p>Expert Developers</p>
            </div>
            <div className={styles.heroStat}>
              <h3>7+</h3>
              <p>Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
