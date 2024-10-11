import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import classes from "./Components/ProjectList/Homepage.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Introduction from "./Components/Introduction/Introduction";
import About from "./Components/RedirectCompnents/About";
import Contact from "./Components/RedirectCompnents/Contact";
import Details from "./Components/Details/Details";
import ButtonA from "./Components/Buttons/BottonA";
import Footer from "./Components/Footer/Footer";
import Services from "./Components/RedirectCompnents/Services";
import PortFolio from "./Components/RedirectCompnents/Portfolio";
function App() {
  return (
    <Router>
      <div className={classes.X}>
        <Row>
          <Row className={classes.buttonsStyle}>
            <ButtonA />
          </Row>
          {/* HERE ALL THINGS IMPLEMENTED */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Col className={`${classes.item} ${classes.itemColor1}`}>
                    <Introduction />
                  </Col>
                  <Col className={`${classes.item2} ${classes.itemColor1}`}>
                    <Details />
                  </Col>
                </>
              }
            ></Route>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<PortFolio />} />
          </Routes>
          {/* HERE ALL THINGS IMPLEMENTED */}

          <Footer />
        </Row>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
