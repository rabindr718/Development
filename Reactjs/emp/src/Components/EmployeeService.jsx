import axios from "axios";
const REST_SPRINGBOOT_API = "http://localhost:7250/api/employees";

const EmployeeService = () => axios.get(REST_SPRINGBOOT_API);

export default EmployeeService;
