import React, { useState } from "react";
import styles from "./Testimonials.module.css";

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "1",
    name: "Klaus Weber",
    position: "CTO",
    company: "TechStart GmbH (Germany)",
    content:
      "EuroTech Solutions delivered an outstanding e-commerce platform that exceeded our expectations. Their attention to GDPR compliance and user experience was exceptional.",
    rating: 5,
  },
  {
    id: "2",
    name: "Marie Dubois",
    position: "Product Manager",
    company: "InnovateFR (France)",
    content:
      "The mobile app they developed for us has been a game-changer. Professional team, timely delivery, and excellent post-launch support.",
    rating: 5,
  },
  {
    id: "3",
    name: "Giovanni Rossi",
    position: "CEO",
    company: "MedTech Italia (Italy)",
    content:
      "Their healthcare dashboard solution transformed how we manage patient data. Secure, compliant, and incredibly user-friendly.",
    rating: 5,
  },
  {
    id: "4",
    name: "Anna Kowalczyk",
    position: "Operations Director",
    company: "LogiPoland (Poland)",
    content:
      "The supply chain management system they built streamlined our entire operation. ROI was visible within the first quarter.",
    rating: 5,
  },
  {
    id: "5",
    name: "Erik van der Berg",
    position: "Head of Digital",
    company: "FinanceNL (Netherlands)",
    content:
      "Professional, reliable, and innovative. Their banking solution meets all our regulatory requirements while providing an excellent user experience.",
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length
    );
  };

  const currentTestimonial = TESTIMONIALS_DATA[currentIndex];

  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>What Our Clients Say</h2>
          <p>Trusted by businesses across the European Union</p>
        </div>

        <div className={styles.testimonialContainer}>
          <button className={styles.navButton} onClick={prevTestimonial}>
            ‹
          </button>

          <div className={styles.testimonialCard}>
            <div className={styles.rating}>
              {Array.from({ length: currentTestimonial.rating }).map(
                (_, index) => (
                  <span key={index} className={styles.star}>
                    ★
                  </span>
                )
              )}
            </div>
            <p className={styles.content}>"{currentTestimonial.content}"</p>
            <div className={styles.author}>
              <div className={styles.authorInfo}>
                <h4>{currentTestimonial.name}</h4>
                <span>{currentTestimonial.position}</span>
                <span>{currentTestimonial.company}</span>
              </div>
            </div>
          </div>

          <button className={styles.navButton} onClick={nextTestimonial}>
            ›
          </button>
        </div>

        <div className={styles.indicators}>
          {TESTIMONIALS_DATA.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === currentIndex ? styles.active : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
