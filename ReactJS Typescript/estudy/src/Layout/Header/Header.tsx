import React from "react";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const Clickable = () => {};
  const LoginHandle = () => {
    navigate("/Login");
  };
  return (
    <header className="header">
      <h1 className="title">E-Study</h1>

      <div className="dropdowns">
        <div className="dropdown">
          <button className="dropbtn" onClick={Clickable}>
            Item 1
          </button>
        </div>
        <div className="dropdown">
          <button className="dropbtn" onClick={Clickable}>
            Item 2
          </button>
        </div>
        <div className="dropdown">
          <button className="dropbtn" onClick={Clickable}>
            Item 3
          </button>
        </div>
        <div className="dropdown">
          <button className="dropbtn" onClick={Clickable}>
            Item 4
          </button>
        </div>
        <div className="dropdown">
          <button className="dropbtn" onClick={Clickable}>
            Item 5
          </button>
        </div>
      </div>

      <div className="custom-search-container">
        <input type="text" placeholder="Search..." />
        <button className="search-button">
          <svg
            id="tnb-google-search-icon"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.8153 10.3439C12.6061 9.2673 13.0732 7.9382 13.0732 6.5C13.0732 2.91015 10.163 0 6.57318 0C2.98333 0 0.0731812 2.91015 0.0731812 6.5C0.0731812 10.0899 2.98333 13 6.57318 13C8.01176 13 9.3412 12.5327 10.4179 11.7415L10.4171 11.7422C10.4466 11.7822 10.4794 11.8204 10.5156 11.8566L14.3661 15.7071C14.7566 16.0976 15.3898 16.0976 15.7803 15.7071C16.1708 15.3166 16.1708 14.6834 15.7803 14.2929L11.9298 10.4424C11.8936 10.4062 11.8553 10.3734 11.8153 10.3439ZM12.0732 6.5C12.0732 9.53757 9.61075 12 6.57318 12C3.53561 12 1.07318 9.53757 1.07318 6.5C1.07318 3.46243 3.53561 1 6.57318 1C9.61075 1 12.0732 3.46243 12.0732 6.5Z"
              fill="black"
            ></path>
          </svg>
        </button>
      </div>

      <div className="toggle-button">
        <button>Toggle</button>
      </div>

      <div className="buttons">
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
        <button>Button 4</button>
        <button onClick={LoginHandle}>Login</button>
      </div>
    </header>
  );
};

export default Header;
