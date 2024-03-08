import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import validator from 'validator';
const Reg = (props) => {
  const { setregList, regList } = props;

  const loginRedirect = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCpassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const regdata = JSON.parse(localStorage.getItem('regdata'));

  const handleReg = (e) => {
    e.preventDefault();

    if (
      userName.trim().length === 0 ||
      fullName.trim().length === 0 ||
      password.trim().length === 0 ||
      cPassword.trim().length === 0
    ) {
      setErrorMsg('All Filed is mendetary');
    } else if (!validator.isAlphanumeric(userName)) {
      setErrorMsg('Enter valid user name');
    } else if (!validator.isEmail(email)) {
      setErrorMsg('Email Not Valid');
    } else if (!email.includes('@prominentpixel.com')) {
      setErrorMsg('Your Email Ends with @prominentpixel.com');
    } else if (!validator.isAlpha(fullName)) {
      setErrorMsg('please enter valied name');
    } else if (password.trim().length < 6 || cPassword.trim().length < 6) {
      setErrorMsg('password atlist on 6 character');
    } else if (!validator.isStrongPassword(password)) {
      setErrorMsg('Give stroge password');
    } else if (password !== cPassword) {
      setErrorMsg('your password and confirm password are not same');
    } else {
      let isFound = false;
      console.log(regdata.length);
      for (let i = 0; i < regdata.length; i++) {
        console.log(i);
        if (regdata[i].UserName === userName) {
          setErrorMsg('Username is already used');
          isFound = true;
          break;
        } else if (regdata[i].Email === email) {
          setErrorMsg('Email is already used');
          isFound = true;
          break;
        }
      }
      if (isFound === false) {
        setregList([
          ...regList,
          {
            id: regList.length,
            UserName: userName,
            Email: email,
            FullName: fullName,
            Password: password,
          },
        ]);
        setUserName('');
        setEmail('');
        setFullName('');
        setCpassword('');
        setPassword('');
        setErrorMsg(null);
        console.log(regList);
        loginRedirect('/Login');
        alert('Account is Created');
      }
    }
  };

  return (
    <>
      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="User Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={cPassword}
                  onChange={(e) => setCpassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ color: 'red' }}>{errorMsg}</Form.Label>
              </Form.Group>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <NavLink to="/">
              <Button variant="secondary">Close</Button>
            </NavLink>
            <Button variant="primary" onClick={handleReg}>
              Register
            </Button>
          </Modal.Footer>
          <p align="center">
            Already Register?
            <NavLink to="/Login"> Login Now</NavLink>
          </p>
        </Modal.Dialog>
      </div>
    </>
  );
};
export default Reg;
