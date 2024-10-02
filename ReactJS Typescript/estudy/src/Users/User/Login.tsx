import React, { FormEvent } from "react";
import classes from "./user.module.css";

const Login = () => {
  document.body.classList.add("no-scroll");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className={classes.parentContainerLOGIN}>
      <div className={classes.mainLogin}>
        <h1>E-Study</h1>
        <h3>Enter your login credentials</h3>
        <form className={classes.XRFORM} onSubmit={handleSubmit} method="POST">
          <label htmlFor="first">Username:</label>
          <input
            type="text"
            id="first"
            name="first"
            placeholder="Enter your Username"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your Password"
            required
          />

          <div className={classes.wrap}>
            <button className={classes.buttonC} type="submit">
              Submit
            </button>
          </div>
        </form>
        <p>
          Not registered?
          <a href="#" style={{ textDecoration: "none" }}>
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
