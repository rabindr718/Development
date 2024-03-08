import React, { useEffect, useCallback } from "react";
import { useState } from "react";
let logoutTimer;
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjacentExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjacentExpirationTime - currentTime;
  return remainingDuration;
};

const retrieveStoredTocken = () => {
  const storeToken = localStorage.getItem("");
  const storeExiparationDate = localStorage.getItem("expirationTime");
  const RemainingTime = calculateRemainingTime(storeExiparationDate);
  if (RemainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }
  return {
    token: storeToken,
    duration: RemainingTime,
  };
};
export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredTocken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(null);
  const userIsLoggedIn = !!token;

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    const reamingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, reamingTime);

    setTimeout(loginHandler, reamingTime);
  };
  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);
  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
