import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import createEmployee from "./EmployeeServiceCreate";
export const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const SubmitHandler = (e) => {
    e.preventDefault();
    const employee = { firstName, lastName, email };
    console.log(employee);
    //Here Post Request for Add Employee to SpringBoot Application
    createEmployee(employee).then((response) => {
      console.log(response.data);
      navigate("/employees");
    });
  };

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        {/* <div className="card"> */}
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center">ADD Employee</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  placeholder="Enter Employee FirstName"
                  name="firstName"
                  value={firstName}
                  className="form-control"
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Employee LastName"
                  name="lastName"
                  value={lastName}
                  className="form-control"
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email Id</label>
                <input
                  type="email"
                  placeholder="Enter Employee Email id"
                  name="email"
                  value={email}
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <button className="btn btn-success" onClick={SubmitHandler}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmployeeComponent;
