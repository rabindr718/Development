import React from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaCode,
} from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Company Info */}
          <div className={styles.column}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <FaCode className={styles.logoIconSvg} />
              </div>
              <span className={styles.logoText}>EuroTech Solutions</span>
            </div>
            <p className={styles.description}>
              Leading software development company serving European enterprises
              with cutting-edge solutions and GDPR-compliant technology.
            </p>
            <div className={styles.socialLinks}>
              <a
                href="https://linkedin.com"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <FaLinkedin className={styles.socialIcon} />
              </a>
              <a
                href="https://twitter.com"
                className={styles.socialLink}
                aria-label="Twitter"
              >
                <FaTwitter className={styles.socialIcon} />
              </a>
              <a
                href="https://github.com"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <FaGithub className={styles.socialIcon} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Services</h3>
            <ul className={styles.linkList}>
              <li>
                <Link to="/services" className={styles.link}>
                  Custom Development
                </Link>
              </li>
              <li>
                <Link to="/services" className={styles.link}>
                  Mobile & Web Apps
                </Link>
              </li>
              <li>
                <Link to="/services" className={styles.link}>
                  Cloud Solutions
                </Link>
              </li>
              <li>
                <Link to="/services" className={styles.link}>
                  AI/ML Integration
                </Link>
              </li>
              <li>
                <Link to="/services" className={styles.link}>
                  Cybersecurity
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Company</h3>
            <ul className={styles.linkList}>
              <li>
                <Link to="/about" className={styles.link}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className={styles.link}>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className={styles.link}>
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className={styles.link}>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className={styles.link}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Contact Info</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <FaMapMarkerAlt className={styles.contactIcon} />
                <span>
                  Berlin, Germany
                  <br />
                  Amsterdam, Netherlands
                </span>
              </div>
              <div className={styles.contactItem}>
                <FaEnvelope className={styles.contactIcon} />
                <span>info@eurotech-solutions.eu</span>
              </div>
              <div className={styles.contactItem}>
                <FaPhone className={styles.contactIcon} />
                <span>+49 30 1234 5678</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © {currentYear} EuroTech Solutions. All rights reserved.
            </p>
            <div className={styles.legalLinks}>
              <Link to="/privacy" className={styles.legalLink}>
                Privacy Policy
              </Link>
              <Link to="/privacy" className={styles.legalLink}>
                Terms of Service
              </Link>
              <Link to="/privacy" className={styles.legalLink}>
                GDPR Compliance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
