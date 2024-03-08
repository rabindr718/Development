import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import classes from "../authentication/register.module.css";
import Navigation from "../components/navigation/navbar";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
const date = new Date();
console.log(date);
const Registration: React.FC = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <div className={classes.mainPlace}>
      <section>
        <Navbar bg="primary" variant="bg">
          <Nav className="me-auto">
            <span>
              <Button variant="primary">Home</Button>
              <Button variant="primary">Login</Button>
            </span>
          </Nav>
        </Navbar>
        <h1>Registration</h1>

        <form className={classes.centerwidth}>
          <div className="input-group">
            <span>
              <i></i>
            </span>
            <input
              id="fullname"
              type="text"
              className="form-control"
              name="fullname"
              placeholder="Full Name"
            />
          </div>
          <div className="input-group">
            <span>
              <i></i>
            </span>
            <input
              id="email"
              type="text"
              className="form-control"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="input-group">
            <span>
              <i></i>
            </span>
            <input
              id="username"
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
            />
          </div>
          <div className="input-group">
            <span></span>
            <input
              id="password"
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="input-group">
            <span></span>
            <input
              id="password"
              type="password"
              className="form-control"
              name="password"
              placeholder="Confirm Password"
            />
          </div>
        </form>

        <footer>
          <div>
            <Button variant="btn btn-primary" onClick={handleClose}>
              Close
            </Button>{" "}
            <Button variant="success primary" onClick={handleClose}>
              Register
            </Button>
            <p className={classes.footerRegister}>
              Are You Already Register..?{" "}
              <NavLink to="/Login"> Login Now</NavLink>
            </p>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Registration;
