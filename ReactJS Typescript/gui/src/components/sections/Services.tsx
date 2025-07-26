import React from "react";
import { SERVICES_DATA } from "../../utils/constants";
import styles from "./Services.module.css";

const Services: React.FC = () => {
  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Our Services</h2>
          <p>
            Comprehensive software solutions tailored for European businesses
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {SERVICES_DATA.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className={styles.features}>
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              {service.price && (
                <div className={styles.price}>{service.price}</div>
              )}
              <button className={styles.serviceButton}>Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
