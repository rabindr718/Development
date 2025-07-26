import React from "react";
import { COMPANY_INFO } from "../../utils/constants";
import styles from "./About.module.css";

const About: React.FC = () => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2>About {COMPANY_INFO.name}</h2>
            <p className={styles.subtitle}>{COMPANY_INFO.tagline}</p>
            <p>
              Founded in {COMPANY_INFO.founded}, we are a leading software
              development company specializing in innovative solutions for
              European businesses. Our team of expert developers and designers
              work tirelessly to deliver cutting-edge web applications, mobile
              solutions, and enterprise software that drive business growth.
            </p>
            <p>
              We understand the unique challenges and regulatory requirements of
              the European market, including GDPR compliance, multilingual
              support, and cultural considerations. Our solutions are built with
              scalability, security, and user experience at the forefront.
            </p>

            <div className={styles.values}>
              <div className={styles.value}>
                <h4>🎯 Innovation</h4>
                <p>Cutting-edge technologies and creative solutions</p>
              </div>
              <div className={styles.value}>
                <h4>🛡️ Security</h4>
                <p>GDPR compliant and enterprise-grade security</p>
              </div>
              <div className={styles.value}>
                <h4>🚀 Performance</h4>
                <p>Optimized solutions for maximum efficiency</p>
              </div>
              <div className={styles.value}>
                <h4>🤝 Partnership</h4>
                <p>Long-term relationships with our clients</p>
              </div>
            </div>
          </div>

          <div className={styles.imageContent}>
            <div className={styles.aboutImage}>
              <div className={styles.imagePlaceholder}>
                <span>Team Photo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
