import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEmployee, getEmployee, updateEmployee } from "./EmployeeService";
export const EmployeeComponent = () => {
  //HERE TAKING INPUT using useState HOOK From FORM DURING SUBMIT
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  //HERE PERFORM VALIDATION
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  console.log(getEmployee(id));

  // HERE FOR UPDATE OPERATION PERFORMED
  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstname);
          setLastName(response.data.lastname);
          setEmail(response.data.email);

          console.log(id);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  //HERE SUBMIT BUTTON OF FORM
  //also Send DATA TO SERVER Using createEmployee
  const SubmitOrUpdateHandler = (e) => {
    e.preventDefault();

    if (FormValidation()) {
      const employee = { firstname, lastname, email };
      console.log(employee);
      //HERE OPERATION FOR UPDATE/PUT EMPLOYEE
      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigate("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        //Here Post Request for Add/Save Employee to SpringBoot Application
        createEmployee(employee)
          .then((response) => {
            console.log(employee);
            console.log(response.data);
            navigate("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  //VALIDATION FUNCTIONS
  const FormValidation = () => {
    let valid = true;
    const ErrorCopy = { ...errors };
    if (firstname.trim()) {
      ErrorCopy.firstname = "";
    } else {
      ErrorCopy.firstname = "FirstName Field is Required";
      valid = false;
    }
    if (lastname.trim()) {
      ErrorCopy.lastname = "";
    } else {
      ErrorCopy.lastname = "LastName Field is Required";
      valid = false;
    }
    if (email.trim()) {
      ErrorCopy.email = "";
    } else {
      ErrorCopy.email = "Email id is Required";
      valid = false;
    }
    setErrors(ErrorCopy);
    return true;
  };
  //CHATGPT GENERATED
  //HERE

  //PAGE NAME DYNAMICALLY CHANGES USING PARAMS Id
  const PageTitle = () => {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">ADD Employee</h2>;
    }
  };

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        {/* <div className="card"> */}
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {/* <h2 className="text-center">ADD Employee</h2> */}
          {PageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  placeholder="Enter Employee FirstName"
                  name="firstname"
                  value={firstname}
                  // Here Dynamically check errors
                  // className="form-control"
                  className={`form-control ${
                    errors.firstname ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
                {/* Here We use to show Errors */}
                {errors.firstname && (
                  <div className="invalid-feedback">{errors.firstname}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Employee LastName"
                  name="lastname"
                  value={lastname}
                  className={`form-control ${
                    errors.lastname ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
                {errors.lastname && (
                  <div className="invalid-feedback">{errors.lastname}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email Id</label>
                <input
                  type="text"
                  placeholder="Enter Employee Email id"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <button
                className="btn btn-success"
                onClick={SubmitOrUpdateHandler}
              >
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
