import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BottonA from "../Buttons/BottonA";
import ButtonB from "../Buttons/ButtonB";
import classes from "./Homepage.module.css";
import Introduction from "../Introduction/Introduction";
import Details from "../Details/Details";
import image01 from "./image01.jpg";
const Homepage = () => {
  return (
    <Row>
      <Col className={`${classes.item} ${classes.itemColor1}`}>
        <BottonA />
        <Introduction />
      </Col>
      <Col className={`${classes.item} ${classes.itemColor2}`}>
        <img auto src={image01}></img>
      </Col>
      <Col className={`${classes.item} ${classes.itemColor1}`}>
        <ButtonB></ButtonB> <Details />
      </Col>
    </Row>
  );
};
export default Homepage;
