import { useRef, useContext } from "react";
import classes from "./profileForm.module.css";
import authContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const history = useHistory();
  const inputPasswordRef = useRef();
  const AuthCtx = useContext(authContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredInputPasswordRef = inputPasswordRef.current.value;
    //Add Validation Here
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDD_Vr13FzGN0QH5K1PEEnu9MCuTu4Ix_U",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: AuthCtx.token,
          password: enteredInputPasswordRef,
          returnSecureToken: false,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then(() => {
      history.replace("/");
      //Assumption always Succeed
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          minLength="7"
          id="new-password"
          ref={inputPasswordRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
