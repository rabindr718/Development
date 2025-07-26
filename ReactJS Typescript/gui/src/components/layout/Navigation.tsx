// src/components/layout/Navigation.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";

interface NavigationProps {
  className?: string;
  onItemClick?: () => void;
}

const navItems = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/about", label: "About" },
  { path: "/portfolio", label: "Portfolio" },
  { path: "/contact", label: "Contact" },
];

const Navigation: React.FC<NavigationProps> = ({
  className = "",
  onItemClick,
}) => {
  const location = useLocation();

  return (
    <nav className={`${styles.nav} ${className}`}>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`${styles.navLink} ${
            location.pathname === item.path ? styles.active : ""
          }`}
          onClick={onItemClick}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
