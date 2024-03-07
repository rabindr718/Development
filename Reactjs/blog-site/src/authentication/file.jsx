// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import validator from "validator";
// const Login = (props) => {
//   const redirectHome = useNavigate();

//   const { regList } = props;

//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [loginSelecter, setLoginSelecter] = useState("Email");

//   const loginHandler = (e) => {
//     e.preventDefault();

//     const getregData = localStorage.getItem("regdata");
//     console.log(getregData);

//     if (email.trim().length === 0 || password.trim().length === 0) {
//       setErrorMsg("All Filed is mendetary");
//     } else if (loginSelecter === "Email" && !validator.isEmail(email)) {
//       setErrorMsg("Email Not Valid");
//     } else if (
//       loginSelecter === "Email" &&
//       !email.includes("@prominentpixel.com")
//     ) {
//       setErrorMsg("Your Email Ends with @prominentpixel.com");
//     } else if (password.trim().length < 6) {
//       setErrorMsg("password atlist on 6 character");
//     } else {
//       if (getregData.length) {
//         const userdata = JSON.parse(getregData);
//         const userlogin = userdata.filter((el, k) => {
//           if (loginSelecter === "Email") {
//             return el.Email === email && el.Password === password;
//           } else if (loginSelecter === "UserName") {
//             return el.UserName === email && el.Password === password;
//           }
//         });

//         console.log(userlogin);

//         if (userlogin.length === 0) {
//           alert("Invalid Data");
//         } else {
//           alert("Login Successfull");
//           localStorage.setItem("userLogin", JSON.stringify(userlogin));
//           redirectHome("/Home");
//         }
//       }
//     }
//   };
//   localStorage.setItem("regdata", JSON.stringify(regList));

//   return (
//     <>
//       <div
//         className="modal show"
//         style={{ display: "block", position: "initial" }}
//       >
//         <Modal.Dialog>
//           <Modal.Header>
//             <Modal.Title>Login</Modal.Title>
//           </Modal.Header>

//           <Modal.Body>
//             <form>
//               <Form.Group
//                 className="mb-3"
//                 controlId="exampleForm.ControlInput1"
//               >
//                 <Form.Select
//                   aria-label="Default select example"
//                   value={loginSelecter}
//                   onChange={(e) => setLoginSelecter(e.target.value)}
//                 >
//                   <option value="Email">Email</option>
//                   <option value="UserName">User Name</option>
//                 </Form.Select>
//               </Form.Group>
//               <Form.Group
//                 className="mb-3"
//                 controlId="exampleForm.ControlInput1"
//               >
//                 <Form.Label>{loginSelecter}</Form.Label>
//                 <Form.Control
//                   type="email"
//                   value={email}
//                   onChange={(event) => setemail(event.target.value)}
//                   placeholder={loginSelecter}
//                 />
//               </Form.Group>

//               <Form.Group
//                 className="mb-3"
//                 controlId="exampleForm.ControlInput1"
//               >
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   value={password}
//                   onChange={(event) => setpassword(event.target.value)}
//                   placeholder="Password"
//                 />
//               </Form.Group>
//               <Form.Group
//                 className="mb-3"
//                 controlId="exampleForm.ControlInput1"
//               >
//                 <Form.Label style={{ color: "red" }}>{errorMsg}</Form.Label>
//               </Form.Group>
//             </form>
//           </Modal.Body>

//           <Modal.Footer>
//             <NavLink to="/">
//               <Button variant="secondary">Close</Button>
//             </NavLink>
//             <Button variant="primary" onClick={loginHandler}>
//               Login
//             </Button>
//           </Modal.Footer>
//           <p align="center">
//             Don't Have Account?
//             <NavLink to="/Reg">Register Now</NavLink>
//           </p>
//         </Modal.Dialog>
//         <p></p>
//       </div>
//     </>
//   );
// };
// export default Login;
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import Form from "react-bootstrap/Form";
// import Modal from "react-bootstrap/Modal";
// import { useState } from "react";
// import classes from "../authentication/register.module.css";
// import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import "./edited.css";
// import { Button } from "react-bootstrap";
// import validator from "validator";
// import React from "react";

// const Login: React.FC = (props) => {
//   const navigate = useNavigate();

//   const [selected, setSelectValue] = useState("Email");
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");

//   const [inputVal, setInputVal] = useState({
//     email: "",
//     username: "",
//     password: "",
//   });
//   console.log(selected);
//   const [errorData, setError] = useState(" ");

//   // Using Single State
//   const fetchData = (e: any) => {
//     const { value, name } = e.target;

//     setInputVal(() => {
//       return {
//         ...inputVal,
//         [name]: value,
//       };
//     });
//   };
//   const loginSubmitHandler = (e: any) => {
//     e.preventDefault();
//     const { email, username, password } = inputVal;
//     console.log(password);
//     console.log(email, username);

//     if (username === " ") {
//       alert("Enter username");
//     } else if (email === " ") {
//       alert("Email field Required");
//     } else if (email === " " && !email.includes("prominentpixel@.com")) {
//       alert("Enter a Valid Mail Id");
//     } else if (password.trim().length < 6) {
//       alert("Enter Long password");
//     } else {
//       console.log("Data Sent SuccessFully");
//       // localStorage.setItem("keys", JSON.stringify([...data, inputVal]));

//       const data = localStorage.getItem("keys");
//       const localStoreData = JSON.parse(data as string);
//       console.log(localStoreData);

//       if (
//         inputVal.email === localStoreData.email &&
//         inputVal.password === localStoreData.password
//       ) {
//         alert("Authentication successful");
//         navigate("/HomeAfterLogin");

//         console.log("Authentication successful");
//       } else {
//         alert("Please Enter Correct Details");
//         console.log("Authentication failed");
//       }

//       console.log(inputVal);
//     }
//   };

//   localStorage.setItem("Login", JSON.stringify(inputVal));

//   const LoginHandler = () => {
//     navigate("/Login");
//   };
//   const HomeHandler = () => {
//     navigate("/");
//   };

//   return (
//     <div className="red">
//       <Navbar bg="primary" variant="bg">
//         <Nav className="me-auto">
//           <span>
//             <Button onClick={HomeHandler} variant="primary">
//               Home
//             </Button>
//             <Button onClick={LoginHandler} variant="primary">
//               Login
//             </Button>
//           </span>
//         </Nav>
//       </Navbar>
//       <Modal.Dialog>
//         <Modal.Title>
//           <h1>Login</h1>
//         </Modal.Title>

//         <Modal.Body>
//           <form className={classes.centerwidth}>
//             <div className="input-group">
//               <Form.Group className="input-group">
//                 <Form.Select
//                   className="form-control"
//                   value={selected}
//                   onChange={(e) => setSelectValue(e.target.value)}
//                 >
//                   <option value="Email">Email Id</option>
//                   <option value="UserName">UserName</option>
//                 </Form.Select>
//               </Form.Group>

//               <Form.Control
//                 type={selected === "Email" ? "email" : "text"}
//                 placeholder={
//                   selected === "Email"
//                     ? "Enter your Email"
//                     : "Enter your Username"
//                 }
//                 // value={selected === "Email" ? email : username}

//                 onChange={fetchData}
//               />
//             </div>
//             <div className="input-group">
//               <span></span>
//               <input
//                 id="password"
//                 type="password"
//                 className="form-control"
//                 name="password"
//                 placeholder="Password"
//                 onChange={fetchData}
//               />
//             </div>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label style={{ color: "red" }}>{errorData}</Form.Label>
//             </Form.Group>
//             <div className="row">
//               <div className="col-sm-12 text-center">
//                 <button
//                   id="btnSearch"
//                   className="btn btn-primary btn-md center-block"
//                   onClick={loginSubmitHandler}
//                 >
//                   Login
//                 </button>
//               </div>
//             </div>
//           </form>
//         </Modal.Body>

//         <p className={classes.footerRegister}>
//           Don't Have Account?{" "}
//           <NavLink to="/Registration"> Register Now</NavLink>
//         </p>
//       </Modal.Dialog>
//     </div>
//   );
// };

// export default Login;
