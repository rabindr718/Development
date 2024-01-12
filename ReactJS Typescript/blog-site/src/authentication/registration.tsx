import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import classes from "../authentication/register.module.css";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
const date = new Date();
console.log(date);
const Registration: React.FC = (props: any) => {
  const { setvalList, valList }: any = props;
  const [inputValue, setInputValue] = useState({
    fullname: " ",
    email: " ",
    username: " ",
    password: " ",
    confirmpass: " ",
  });

  const navigate = useNavigate();
  const HomeHandler = () => {
    navigate("/");
  };
  const LoginHandler = () => {
    navigate("/Login");
  };

  const fetchData = (e: any) => {
    console.log(e.target.value);
    const { value, name } = e.target;

    setInputValue(() => {
      return {
        ...inputValue,
        [name]: value,
      };
    });
  };
  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log(inputValue);
    const { fullname, email, username, password, confirmpass } = inputValue;
    if (fullname === " ") {
      alert("Please Enter your FullName");
    } else if (email === " " && !email.includes("prominentpixel@.com")) {
      alert("Please Enter Your Mail Id");
    } else if (username === " ") {
      alert("Please Enter Your Username");
    } else if (password.trim().length < 6 || confirmpass.trim().length < 6) {
      alert("Your Pasword Should be Greater than 6");
    } else if (!confirmpass.includes(password)) {
      alert("Enter correct password");
    } else {
      let isFound = false;

      console.log(valList);

      // for (let i = 0; i < valList.length; i++) {
      //   if (valList[i].Username === username) {
      //     setvalList("Username is already used");
      //     isFound = true;
      //     break;
      //   } else if (valList[i].Email === email) {
      //     setvalList("Email is already used");
      //     isFound = true;
      //     break;
      //   }
      // }
      // if (isFound === false) {
      //   setvalList([
      //     ...valList,
      //     {
      //       id: valList.length,
      //       username: username,
      //       Email: email,
      //       fullname: fullname,
      //       password: password,
      //     },
      //   ]);
      //   console.log(inputValue);

      //   // }
      //   LoginHandler();
      // }
      // localStorage.setItem("allkeys", JSON.stringify([...valList, inputValue]));
      console.log(inputValue);
      localStorage.setItem("LoginData", JSON.stringify(inputValue));
      navigate("/Login");
    }
  };
  return (
    <div className={classes.mainPlace}>
      <section>
        <Navbar bg="primary" variant="bg">
          <Nav className="me-auto">
            <span>
              <Button variant="primary" onClick={HomeHandler}>
                Home
              </Button>
              <Button variant="primary" onClick={LoginHandler}>
                Login
              </Button>
            </span>
          </Nav>
        </Navbar>
        <h1>Registration</h1>

        <form className={classes.centerwidth}>
          <div className="input-group">
            <input
              id="fullname"
              type="text"
              name="fullname"
              className="form-control"
              placeholder="Full Name"
              onChange={fetchData}
            />
          </div>
          <div className="input-group">
            <input
              id="email"
              type="text"
              name="email"
              className="form-control"
              placeholder="Email"
              onChange={fetchData}
            />
          </div>
          <div className="input-group">
            <input
              id="username"
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              onChange={fetchData}
            />
          </div>
          <div className="input-group">
            <input
              id="password"
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={fetchData}
            />
          </div>
          <div className="input-group">
            <input
              id="Confirmpassword"
              type="password"
              name="confirmpass"
              className="form-control"
              placeholder="Confirm Password"
              onChange={fetchData}
            />
          </div>

          <Button variant="success primary" onClick={formSubmitHandler}>
            Register
          </Button>
        </form>
        <footer>
          <div>
            <p className={classes.footerRegister}>
              Are You Already Register..?{" "}
              <NavLink to="/Login"> Login Now</NavLink>
            </p>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Registration;
