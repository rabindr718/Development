import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classess from "../Registation/Registration.module.css";
const RegisterationComponent = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [lastname, setLastname] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");
  const [image, setimage] = useState("");

  const redirector = useNavigate();
  const RegistrationSubmit = (e) => {
    e.preventDefault();
    const RegistrationObject = {
      Confirmpassword,
      password,
      emailId,
      lastname,
      mobileNumber,
      firstname,
      username,
      image,
    };
    console.log(RegistrationObject);

    redirector("/Login");
  };
  return (
    <div>
      <div className={classess.RegistrationForm}>
        <h2>Registration Form</h2>
        <form>
          <div>
            <div>
              <label htmlFor="username">User-Name</label>
              <input
                name="username"
                value={username}
                type="text"
                placeholder="Enter Your User-Name"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <label htmlFor="firstname">FirstName</label>
            <input
              name="firstname"
              value={firstname}
              type="text"
              placeholder="Enter Your Firstname"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastname">LastName</label>
            <input
              name="lastname"
              value={lastname}
              type="text"
              placeholder="Enter Your Lastname"
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="mobileNumber">Mobile </label>
            <input
              name="mobileNumber"
              value={mobileNumber}
              type="number"
              placeholder="Enter Your Mobile Number"
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="emailId">Email id</label>
            <input
              name="emailId"
              value={emailId}
              type="text"
              placeholder="Enter Your Email id"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              value={password}
              type="password"
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="Confirmpassword">Confirm Password</label>
            <input
              name="Confirmpassword"
              value={Confirmpassword}
              type="password"
              placeholder="Enter Your Password"
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
          </div>

          <div className={classess.marginBotton}>
            <label htmlFor="image">Select Profile Image</label>
            <input
              className={classess.fileInput}
              value={image}
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setimage(e.target.value);
              }}
            />
          </div>
          <input
            type="submit"
            onClick={RegistrationSubmit}
            value="Registration"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default RegisterationComponent;
