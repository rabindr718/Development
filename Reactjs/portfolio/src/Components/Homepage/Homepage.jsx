import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BottonA from "../Buttons/BottonA";
import classes from "./Homepage.module.css";
import Introduction from "../Introduction/Introduction";
import Details from "../Details/Details";
import image01 from "./image01.jpg";
import Footer from "../Footer/Footer";
const Homepage = () => {
  return (
    <div className={classes.X}>
      <Row>
        <Row className={classes.buttonsStyle}>
          <BottonA />
        </Row>

        <Col className={`${classes.item} ${classes.itemColor1}`}>
          <Introduction />
        </Col>
        <Col className={`${classes.item2} ${classes.itemColor1}`}>
          <Details />
        </Col>
        <Footer />
      </Row>
    </div>
  );
};
export default Homepage;
