import React, { useState } from "react";
import classess from "../LoginAuthenticate/Login.module.css";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigator = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const LoginHandler = () => {
    const LoginValue = { username, password };
    console.log(LoginValue);
    navigator("/LoginSuccess");
  };

  return (
    <div>
      <div className={classess.loginForm}>
        <h2>Login Authentication</h2>
        <form>
          <div>
            <label htmlFor="username">UserName</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Your Username"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Your Username"
            />
          </div>
          {/* <button type="submit">Login</button> */}
          <input type="submit" onClick={LoginHandler} value="Login"></input>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
