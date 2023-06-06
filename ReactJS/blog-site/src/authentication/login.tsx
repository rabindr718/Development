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
  // const [valList, setvalList] = useState([]);

  // const { valList }: any = props;
  const navigate = useNavigate();

  const [selected, setSelectValue] = useState("Email");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const handleInputChange = (e: any) => {
    if (selected === "Email") {
      setEmail(e.target.value);
    } else if (selected === "UserName") {
      setUsername(e.target.value);
    }
    console.log(email);
    console.log(username);
  };

  const [inputVal, setInputVal] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errorData, setError] = useState(" ");

  //Using Single State
  const fetchData = (e: any) => {
    const { value, name } = e.target;

    setInputVal(() => {
      return {
        ...inputVal,
        [name]: value,
      };
    });
  };

  const loginSubmitHandler = (e: any) => {
    e.preventDefault();
    e.handleInputChange(); 
    const { email, username, password } = inputVal;
    console.log(password);
    console.log(email, username);
    if (username === " ") {
      alert("Enter username");
    } else if (email === " ") {
      alert("Email field Required");
    } else if (email === " " && !email.includes("prominentpixel@.com")) {
      alert("Enter a Valid Mail Id");
    } else if (password.trim().length < 6) {
      alert("Enter Long password");
    } else {
      console.log("Data Sent SuccessFully");
      // localStorage.setItem("keys", JSON.stringify([...data, inputVal]));

      const data = localStorage.getItem("keys");
      const localStoreData = JSON.parse(data as string);
      console.log(localStoreData);

      if (
        inputVal.email === localStoreData.email &&
        inputVal.password === localStoreData.password
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
          <form className={classes.centerwidth}>
            <div className="input-group">
              {/* <Form.Group className="input-group">
                <Form.Select
                  className="form-control"
                  value={selected}
                  onChange={(e) => setSelectValue(e.target.value)}
                >
                  <option value="Email">Email Id</option>
                  <option value="UserName">UserName</option>
                </Form.Select>
              </Form.Group> */}
              <Form.Group className="input-group">
                <Form.Select
                  className="form-control"
                  value={selected}
                  onChange={(e: any) => setSelectValue(e.target.value)}
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
                // name={selected === "Email" ? email : username}
                value={selected === "Email" ? email : username}
                onChange={handleInputChange}
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
                onChange={fetchData}
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
                  onClick={loginSubmitHandler}
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
