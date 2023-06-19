import Navigation from "../navigation/navbar";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import classes from "./afterlogi.module.css";
import { useState } from "react";

const HomeAfterLogin: React.FC = (props) => {
  const [blogsVisible, setBlogVisible] = useState(false);
  const localStorageData = JSON.parse(
    localStorage.getItem("LoginData") as string
  );
  const username =
    localStorageData.username.charAt(0).toUpperCase() +
    localStorageData.username.substring(1);

  console.log(username);
  return (
    <div>
      <Navbar bg="primary" variant="bg">
        <Nav className="me-auto">
          <span>
            <Navigation />
          </span>
        </Nav>
        <div className={classes.loginName}>
          <strong>Hello {username} </strong>
        </div>
      </Navbar>

      <div>{blogsVisible && <h3>All Blogs List</h3>}</div>
      <div className={classes.homeShow}>Hello Rabindra</div>
    </div>
  );
};

export default HomeAfterLogin;
