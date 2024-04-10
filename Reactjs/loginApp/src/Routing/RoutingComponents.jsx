import React, { useState } from "react";
import classess from "./Routing.module.css";
import { Route, Routes } from "react-router-dom";
import LoginComponent from "../Components/LoginAuthenticate/LoginComponent";
import Registeration from "../Components/Registation/RegisterationComponent";
import ServicesProvide from "../Components/NavbarComponents/ServicesProvide";
import Contact from "../Components/NavbarComponents/Contact";
import About from "../Components/NavbarComponents/About";
import SuccessfullLogin from "../Components/Items/SuccessfullLogin";
import ProfileModal from "../Components/Modal/ProfileModal";

const RoutingComponents = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Routes className={classess.RoutingBotton}>
      <Route path="/" element={<LoginComponent />}></Route>
      <Route path="/LoginSuccess" element={<SuccessfullLogin />}></Route>
      <Route path="/Login" element={<LoginComponent />}></Route>
      <Route path="/Services" element={<ServicesProvide />}></Route>
      <Route path="/Contact" element={<Contact />}></Route>
      <Route path="/About" element={<About />}></Route>
      <Route path="/Registeration" element={<Registeration />}></Route>
      <Route
        path="/ProfileModal"
        element={<ProfileModal isOpen={isOpen} toggleModal={toggleModal} />}
      />
    </Routes>
  );
};

export default RoutingComponents;
