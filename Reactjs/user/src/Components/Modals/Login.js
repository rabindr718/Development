import React, { useState } from "react";
import classes from "./Login.module.css";
import { ICONS } from "../resources/ICONS";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoginModal }) => {
  const navigate = useNavigate();
  const [keys, setKeys] = useState("");
  const CloseModal = () => {
    setLoginModal(false);
  };
  const EnterInGalley = () => {
    if (keys == 1234) {
      navigate("/display");
      setLoginModal(false);
    } else if (keys == 12345) {
      navigate("/gallery");
      setLoginModal(false);
    } else {
      navigate("/");
      setLoginModal(false);
    }
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
          <button
            type="button"
            onClick={EnterInGalley}
            className={classes.btnEnter}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
