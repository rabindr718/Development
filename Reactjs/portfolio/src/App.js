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
import Skills from "./Components/RedirectCompnents/Skills";
import Experience from "./Components/RedirectCompnents/Experience";
import Services from "./Components/RedirectCompnents/Services";
import PortFolio from "./Components/RedirectCompnents/Portfolio";
import { ROUTES } from "././Routes/Routes";
function App() {
  return (
    <Router>
      <div>
        <div className={classes.buttonsStyle}>
          <ButtonA />
        </div>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <div className={classes.flexRow}>
                  <Col className={classes.item}>
                    <Introduction />
                  </Col>
                  <Col className={classes.item2}>
                    <Details />
                  </Col>
                </div>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<PortFolio />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
          </Routes>
        </div>
        <Footer className={classes.footer} />
      </div>
    </Router>
  );
}

export default App;
