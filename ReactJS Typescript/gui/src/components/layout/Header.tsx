import React from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaCode } from "react-icons/fa";
import Navigation from "./Navigation";
import styles from "./Header.module.css";
import { useHeader } from "../../hooks/useHeader";

const Header: React.FC = () => {
  const { isMenuOpen, isScrolled, setIsMenuOpen } = useHeader();

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <FaCode className={styles.logoIconSvg} />
            </div>
            <span className={styles.logoText}>EuroTech Solutions</span>
          </Link>

          {/* Desktop Navigation */}
          <Navigation className={styles.desktopNav} />

          {/* Theme Toggle & Mobile Menu */}
          <div className={styles.headerActions}>
            <button className={styles.themeToggle} aria-label="Toggle theme">
              {/* {theme === "light" ? "🌙" : "☀️"} */}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={styles.mobileMenuButton}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className={styles.menuIcon} />
              ) : (
                <FaBars className={styles.menuIcon} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <Navigation
              className={styles.mobileNav}
              onItemClick={() => setIsMenuOpen(false)}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
