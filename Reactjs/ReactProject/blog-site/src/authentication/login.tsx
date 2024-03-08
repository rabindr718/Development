import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import classes from "../components/homepage/home.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./edited.css";
import Navigation from "../components/navigation/navbar";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [selected, setSelectValue] = useState("Email");
  const [emailID, setemailID] = useState("");
  const loginHandle = (e: any) => {
    e.preventDefault();
  };
  const gotoLogin = () => {
    navigate("/Login");
  };

  const modelAndLoginHandler = () => {
    gotoLogin();
  };

  return (
    <div className="red">
      <Navbar bg="primary" variant="bg">
        <Nav className="me-auto">
          <span>
            <Button variant="primary">Home</Button>
            <Button variant="primary" onClick={modelAndLoginHandler}>
              Login
            </Button>
            <Navigation />
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
              <Form.Group className="input-group">
                <Form.Select
                  className="form-control"
                  value={selected}
                  onChange={(e) => setSelectValue(e.target.value)}
                >
                  <option value="Email">Email Id</option>
                  <option value="UserName">UserName</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="input-group">
                {/* <Form.Label>{selected}</Form.Label> */}
                <Form.Control
                  type="email"
                  value={emailID}
                  onChange={(event) => setemailID(event.target.value)}
                  placeholder={selected}
                />
              </Form.Group>
            </div>
            <div className="input-group">
              <span></span>
              <input
                id="password"
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
              />
            </div>
          </form>
          {/* <form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Select
                aria-label="Default select example"
                value={selected}
                onChange={(e) => setSelectValue(e.target.value)}
              >
                <option value="Email">Enter Email</option>
                <option value="UserName">Enter UserName</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{selected}</Form.Label>
              <Form.Control
                type="email"
                value={emailID}
                onChange={(event) => setemailID(event.target.value)}
                placeholder={selected}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </form> */}
        </Modal.Body>
        <div className="row">
          <div className="col-sm-12 text-center">
            <button
              id="btnSearch"
              className="btn btn-primary btn-md center-block"
              onClick={loginHandle}
            >
              Login
            </button>{" "}
            <button
              id="btnClear"
              className="btn btn-danger btn-md center-block"
            >
              Close
            </button>
          </div>
        </div>

        <p className={classes.footerRegister}>
          Don't Have Account?{" "}
          <NavLink to="/Registration"> Register Now</NavLink>
        </p>
      </Modal.Dialog>
    </div>
  );
};

export default Login;
