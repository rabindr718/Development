import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeService, deleteEmployee } from "./EmployeeService";
const EmployeeList = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all employees when the component mounts

    // EmployeeService()
    //   .then((response) => {
    //     setEmployee(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching employees:", error);
    //   });

    //SAME METHOD COPY FOR REUSE in below getAllEmployee
    // Fetch all employees when the component mounts
    getAllEmployee();
  }, []);
  const getAllEmployee = () => {
    EmployeeService()
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };

  const RedirectToADDEmployee = () => {
    navigate("/addEmployee");
  };

  const updateEmployee = (id) => {
    console.log(id);
    navigate(`/editEmployee/${id}`);
  };
  //HERE FOR DELETE EMPLOYEE
  const removeEmployee = (id) => {
    console.log(employee);
    console.log(employee);
    console.log(id);
    deleteEmployee(id)
      .then((response) => {
        getAllEmployee();
      })
      .catch((error) => console.log(error));
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
                    <button
                      style={{ marginLeft: "10px" }}
                      className="btn btn-danger"
                      onClick={() => removeEmployee(emp.id)}
                    >
                      Delete
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
