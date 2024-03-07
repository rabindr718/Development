import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import validator from "validator";
const Login = (props) => {
  const redirectHome = useNavigate();

  const { regList } = props;

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [loginSelecter, setLoginSelecter] = useState("Email");

  const loginHandler = (e) => {
    e.preventDefault();

    const getregData = localStorage.getItem("regdata");
    console.log(getregData);

    if (email.trim().length === 0 || password.trim().length === 0) {
      setErrorMsg("All Filed is mendetary");
    } else if (loginSelecter === "Email" && !validator.isEmail(email)) {
      setErrorMsg("Email Not Valid");
    } else if (
      loginSelecter === "Email" &&
      !email.includes("@prominentpixel.com")
    ) {
      setErrorMsg("Your Email Ends with @prominentpixel.com");
    } else if (password.trim().length < 6) {
      setErrorMsg("password atlist on 6 character");
    } else {
      if (getregData.length) {
        const userdata = JSON.parse(getregData);
        const userlogin = userdata.filter((el, k) => {
          if (loginSelecter === "Email") {
            return el.Email === email && el.Password === password;
          } else if (loginSelecter === "UserName") {
            return el.UserName === email && el.Password === password;
          }
        });

        console.log(userlogin);

        if (userlogin.length === 0) {
          alert("Invalid Data");
        } else {
          alert("Login Successfull");
          localStorage.setItem("userLogin", JSON.stringify(userlogin));
          redirectHome("/Home");
        }
      }
    }
  };
  localStorage.setItem("regdata", JSON.stringify(regList));

  return (
    <>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Select
                  aria-label="Default select example"
                  value={loginSelecter}
                  onChange={(e) => setLoginSelecter(e.target.value)}
                >
                  <option value="Email">Email</option>
                  <option value="UserName">User Name</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>{loginSelecter}</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(event) => setemail(event.target.value)}
                  placeholder={loginSelecter}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(event) => setpassword(event.target.value)}
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ color: "red" }}>{errorMsg}</Form.Label>
              </Form.Group>
            </form>
          </Modal.Body>

          <Modal.Footer></Modal.Footer>
        </Modal.Dialog>
        <p></p>
      </div>
    </>
  );
};
export default Login;
