import React from "react";
import classess from "./Botton.module.css";
import { Link } from "react-router-dom";
const BottonA = () => {
  return (
    <div className={classess.container}>
      <Link>About me</Link> <Link>Services</Link>{" "}
    </div>
  );
};

export default BottonA;
