import React from "react";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BottonA from "../Buttons/BottonA";
import ButtonB from "../Buttons/ButtonB";
import classes from "./Homepage.module.css";
import Introduction from "../Introduction/Introduction";
import Details from "../Details/Details";
const Homepage = () => {
  return (
    // <Container>
    <Row>
      <Col className={`${classes.item} ${classes.itemColor1}`}>
        <BottonA />
        <Introduction />
      </Col>
      <Col className={`${classes.item} ${classes.itemColor2}`}>2 of 3</Col>
      <Col className={`${classes.item} ${classes.itemColor1}`}>
        <ButtonB></ButtonB> <Details />
      </Col>
    </Row>
    // </Container>
  );
};
export default Homepage;
