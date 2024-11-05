import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { FaAngleDown, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownFocused, setIsDropdownFocused] = useState(false);
  const searchRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSearchClick = () => {
    setIsFocused(true);
  };

  const handleDropdownClick = (event) => {
    event.stopPropagation();
    toggleDropdown();
    setIsDropdownFocused(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
        setIsDropdownFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon logo"
        />
      </Link>
      <span className={styles.locationX}>
        <FaMapMarkerAlt />
        <div>
          <span className={styles.locationXXW}>Deliver to Rabindra</span>
          <span className={styles.locationXX}>Dehradun 248001</span>
        </div>
      </span>

      <div
        className={`header__search ${
          isFocused ? "header__search--focused" : ""
        }`}
        onClick={handleSearchClick}
        ref={searchRef}
      >
        <div
          className={`${styles.dropdown} ${
            isDropdownFocused ? "dropdown--focused" : ""
          }`}
          onClick={handleDropdownClick}
        >
          <button className={styles.dropdownButton}>
            All <FaAngleDown />
          </button>
          {showDropdown && (
            <div className={styles.dropdownMenu}>
              <a href="#">All Departments</a>
              <a href="#">Alexa Skills</a>
              <a href="#">Amazon Devices</a>
              <a href="#">Amazon Fashion</a>
              <a href="#">Amazon Pharmacy</a>
              <a href="#">Amazon Warehouse</a>
              <a href="#">Appliances</a>
              <a href="#">Apps & Games</a>
              <a href="#">Beauty</a>
              <a href="#">Books</a>
              <a href="#">Car & Motorbike</a>
              <a href="#">Clothing & Accessories</a>
              <a href="#">Collectibles</a>
            </div>
          )}
        </div>
        <input
          className="header__search-input"
          type="text"
          placeholder="Search Amazon.in"
        />

        <SearchIcon className="header__search-icon" />
      </div>
      <span className={styles.Indian}>
        <img
          height="16px"
          width="22px"
          src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
          alt="India Flag"
        />
        IND
      </span>

      <div
        className="header__nav"
        style={{ marginLeft: "auto", marginRight: 0 }}
      >
        <Link to="/login">
          <div className="header__option">
            <span className={`${styles.rightSideFont} header__option-line-one`}>
              Hello, Rabindra
            </span>
            <span className={`${styles.locationXX} header__option-line-two`}>
              Account & Details
            </span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header__option">
            <span className={`${styles.rightSideFont} header__option-line-one`}>
              Returns
            </span>
            <span className="header__option-line-two">& Orders</span>
          </div>
        </Link>

        <div className="header__option">
          <span className={`${styles.rightSideFont} header__option-line-one`}>
            Your
          </span>
          <span className="header__option-line-two">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__option-basket">
            <ShoppingBasketIcon />
            <span className="header__option-line-two header__basket-count">
              0
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
