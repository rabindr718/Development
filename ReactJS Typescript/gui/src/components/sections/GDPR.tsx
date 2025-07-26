import React from "react";
import styles from "./GDPR.module.css";

const GDPR: React.FC = () => {
  return (
    <section className={styles.gdpr}>
      <div className={styles.container}>
        <div className={styles.gdprBanner}>
          <div className={styles.bannerContent}>
            <div className={styles.bannerText}>
              <h3>🍪 We Respect Your Privacy</h3>
              <p>
                We use cookies and similar technologies to enhance your browsing
                experience and analyze website traffic in compliance with GDPR
                regulations.
              </p>
            </div>
            <div className={styles.bannerActions}>
              <button className={styles.acceptButton}>Accept All</button>
              <button className={styles.settingsButton}>Cookie Settings</button>
            </div>
          </div>
        </div>

        <div className={styles.gdprInfo}>
          <h2>GDPR Compliance & Data Protection</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>🛡️</span>
              <h4>Data Protection</h4>
              <p>
                We implement robust security measures to protect your personal
                data in accordance with EU GDPR requirements.
              </p>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>🔍</span>
              <h4>Transparency</h4>
              <p>
                Clear information about data collection, processing, and your
                rights as a data subject under GDPR.
              </p>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>✋</span>
              <h4>Your Rights</h4>
              <p>
                Access, rectify, erase, or port your data. Exercise your GDPR
                rights at any time by contacting us.
              </p>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>🏛️</span>
              <h4>Legal Compliance</h4>
              <p>
                Full compliance with EU regulations including GDPR, ePrivacy
                Directive, and national data protection laws.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GDPR;
