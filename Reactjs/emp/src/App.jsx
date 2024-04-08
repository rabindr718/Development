import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import EmployeeList from "./Components/EmployeeList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./HeaderFooter/Header";
import Footer from "./HeaderFooter/Footer";
import EmployeeComponent from "./Components/EmployeeComponent";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* http://localhost:5173 */}
        <Route path="/" element={<EmployeeList />}></Route>
        {/* http://localhost:5173/employees */}
        <Route path="/employees" element={<EmployeeList />}></Route>
        {/* http://localhost:5173/addEmployee */}
        <Route path="/addEmployee" element={<EmployeeComponent />}></Route>
        {/* http://localhost:5173/editEmployee/1 */}
        <Route path="/editEmployee/:id" element={<EmployeeComponent />}></Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
