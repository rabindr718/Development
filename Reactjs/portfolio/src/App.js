import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import classes from "./Components/ProjectList/Homepage.module.css";
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
import Gallery from "./Components/Gallery/Gallery";
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
              path={ROUTES.HOME}
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
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.CONTACT} element={<Contact />} />
            <Route path={ROUTES.SERVICES} element={<Services />} />
            <Route path={ROUTES.PORTFOLIO} element={<PortFolio />} />
            <Route path={ROUTES.SKILLS} element={<Skills />} />
            <Route path={ROUTES.EXPERIENCE} element={<Experience />} />
            <Route path={ROUTES.GALLERY} element={<Gallery />} />
          </Routes>
        </div>
        <Footer className={classes.footer} />
      </div>
    </Router>
  );
}

export default App;
