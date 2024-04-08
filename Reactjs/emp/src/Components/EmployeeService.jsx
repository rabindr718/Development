import axios from "axios";
const REST_SPRINGBOOT_API = "http://localhost:7250/api/employees";

//This Function Fetch and Display List in React Application from Server
export const EmployeeService = () => axios.get(REST_SPRINGBOOT_API);

//This Function Send data in React Application to Server
export const createEmployee = (employee) =>
  axios.post(REST_SPRINGBOOT_API, employee);

//This Function Fetch and Display data in React Application from Server for EDITING
export const getEmployee = (employeeId) =>
  axios.get(REST_SPRINGBOOT_API + "/" + employeeId);

//This Function is USED for Update
export const updateEmployee = (employeeId, employee) =>
  axios.put(REST_SPRINGBOOT_API + "/" + employeeId, employee);

//This Function is Used to Delete the The data of Given id from Server using React Appllication

export const deleteEmployee = (employeeId) =>
  axios.delete(REST_SPRINGBOOT_API + "/" + employeeId);
