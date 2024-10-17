import React, { useState } from "react";
import classes from "./Login.module.css";
import { ICONS } from "../resources/ICONS";

const Login = ({ setLoginModal }) => {
  const [keys, setKeys] = useState("");
  const CloseModal = () => {
    setLoginModal(false);
  };
  const EnterInGalley = () => {
    console.log(keys);
    setKeys("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      EnterInGalley();
    }
  };

  return (
    <div className="transparent-model">
      <div className={classes.ModalContainer}>
        <div className={classes.CrossXRight}>
          <img
            onClick={CloseModal}
            className={classes.ImgName}
            src={ICONS.D_Cross}
            alt="CrossIcon"
          />
        </div>

        <div className={classes.forForm}>
          <div className={classes.PassInput}>
            <input
              type="password"
              name="Keys"
              value={keys}
              onChange={(e) => setKeys(e.target.value)}
              placeholder="Enter Access Keys"
              onKeyDown={handleKeyDown}
            />
          </div>
          <button onClick={EnterInGalley} className={classes.btnEnter}>
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
