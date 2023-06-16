import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import classes from "../authentication/register.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./edited.css";
import { Button } from "react-bootstrap";
import validator from "validator";
import React from "react";

const Login: React.FC = (props) => {
  const navigate = useNavigate();
  const [errorData, setError] = useState("");

  const [selected, setSelectValue] = useState<"Email" | "UserName">("Email");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [inputVal, setInputVal] = useState({
    email: "",
    username: "",
    password: "",
  });
  const fetchPasswordValue = (e: any) => {
    const { value, name } = e.target;

    setInputVal(() => {
      return {
        ...inputVal,
        [name]: value,
      };
    });
  };
  const fetchUserName_Email = (e: any) => {
    const { name, value } = e.target;

    if (selected === "Email") {
      setEmail(value);
    } else if (selected === "UserName") {
      setUsername(value);
    }

    setInputVal((inputVal) => ({
      ...inputVal,
      [name]: value,
    }));
  };

  const loginSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, username, password } = inputVal;
    e.preventDefault();
    console.log(email);
    console.log(username);
    console.log(password);
    // Rest of your login validation logic...

    if (selected === "Email") {
      if (email.trim() === "") {
        alert("Email field is required");
      } else if (
        !validator.isEmail(email) &&
        !email.includes("prominentpixel@.com")
      ) {
        alert("Enter a valid email address");
      }
    } else if (selected === "UserName") {
      if (username.trim() === "") {
        alert("Enter Username");
      }
    }

    if (password.trim().length < 6) {
      alert("Enter a password with at least 6 characters");
    } else {
      console.log("Data Sent SuccessFully");
      // localStorage.setItem("keys", JSON.stringify([...data, inputVal]));

      const data = localStorage.getItem("keys");
      const localStoreData = JSON.parse(data as string);
      console.log(localStoreData);

      if (
        inputVal.email === localStoreData.email ||
        (inputVal.username === localStoreData.username &&
          inputVal.password === localStoreData.password)
      ) {
        alert("Authentication successful");
        navigate("/HomeAfterLogin");

        console.log("Authentication successful");
      } else {
        alert("Please Enter Correct Details");
        console.log("Authentication failed");
      }

      console.log(inputVal);
    }
  };

  localStorage.setItem("Login", JSON.stringify(inputVal));

  const LoginHandler = () => {
    navigate("/Login");
  };
  const HomeHandler = () => {
    navigate("/");
  };

  return (
    <div className="red">
      <Navbar bg="primary" variant="bg">
        <Nav className="me-auto">
          <span>
            <Button onClick={HomeHandler} variant="primary">
              Home
            </Button>
            <Button onClick={LoginHandler} variant="primary">
              Login
            </Button>
          </span>
        </Nav>
      </Navbar>
      <Modal.Dialog>
        <Modal.Title>
          <h1>Login</h1>
        </Modal.Title>

        <Modal.Body>
          <form className={classes.centerwidth} onSubmit={loginSubmitHandler}>
            <div className="input-group">
              <Form.Group className="input-group">
                <Form.Select
                  className="form-control"
                  value={selected}
                  onChange={(e) =>
                    setSelectValue(e.target.value as "Email" | "UserName")
                  }
                >
                  <option value="Email">Email Id</option>
                  <option value="UserName">Username</option>
                </Form.Select>
              </Form.Group>
              <Form.Control
                type={selected === "Email" ? "email" : "text"}
                placeholder={
                  selected === "Email"
                    ? "Enter your Email"
                    : "Enter your Username"
                }
                name={selected === "Email" ? "email" : "username"}
                value={selected === "Email" ? email : username}
                onChange={fetchUserName_Email}
              />
            </div>
            <div className="input-group">
              <span></span>
              <input
                id="password"
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                onChange={fetchPasswordValue}
              />
            </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "red" }}>{errorData}</Form.Label>
            </Form.Group>
            <div className="row">
              <div className="col-sm-12 text-center">
                <button
                  id="btnSearch"
                  className="btn btn-primary btn-md center-block"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>

        <p className={classes.footerRegister}>
          Don't Have Account?{" "}
          <NavLink to="/Registration"> Register Now</NavLink>
        </p>
      </Modal.Dialog>
    </div>
  );
};

export default Login;
