import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeService } from "./EmployeeService";
const EmployeeList = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all employees when the component mounts
    EmployeeService()
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const RedirectToADDEmployee = () => {
    navigate("/addEmployee");
  };

  const updateEmployee = (id) => {
    console.log(id);
    navigate(`/editEmployee/${id}`);
  };
  return (
    <div className="container">
      <button className="btn btn-primary" onClick={RedirectToADDEmployee}>
        Add Employee
      </button>
      <h1 className="center">List of Employee</h1>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee FirstName</th>
              <th>Employee LastName</th>
              <th>Employee Email Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* console.log(employee); */}
            {employee.map((emp) => {
              return (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.firstname}</td>
                  <td>{emp.lastname}</td>
                  <td>{emp.email}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => updateEmployee(emp.id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default EmployeeList;
