import React from "react";
import classess from "./Botton.module.css";
import { Link } from "react-router-dom";
const BottonA = () => {
  return (
    <div className={classess.container}>
      <Link className={classess.aboutme}>About me</Link>{" "}
      <Link className={classess.Services}>Services</Link>{" "}
    </div>
  );
};

export default BottonA;
