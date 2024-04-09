import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginComponent from "../Components/LoginAuthenticate/LoginComponent";
import Registeration from "../Components/Registation/RegisterationComponent";
import ServicesProvide from "../Components/NavbarComponents/ServicesProvide";
import Contact from "../Components/NavbarComponents/Contact";
import About from "../Components/NavbarComponents/About";
import SuccessfullLogin from "../Components/Services/SuccessfullLogin";
import classess from "./Routing.module.css";
const RoutingComponents = () => {
  return (
    <Routes className={classess.RoutingBotton}>
      <Route path="/" element={<LoginComponent />}></Route>
      <Route path="/LoginSuccess" element={<SuccessfullLogin />}></Route>
      <Route path="/Login" element={<LoginComponent />}></Route>
      <Route path="/Services" element={<ServicesProvide />}></Route>
      <Route path="/Contact" element={<Contact />}></Route>
      <Route path="/About" element={<About />}></Route>
      <Route path="/Registeration" element={<Registeration />}></Route>
    </Routes>
  );
};

export default RoutingComponents;
