import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddData from "./Components/AddData";
import ViewData from "./Components/ViewData";
import EditData from "./Components/EditData";

function App() {
  const [data, setData] = useState([]);

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Add Data</Link>
          </li>
          <li>
            <Link to="/view">View Data</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<AddData data={data} setData={setData} />} />
        <Route
          path="/view"
          element={<ViewData data={data} setData={setData} />}
        />
        <Route
          path="/edit/:id"
          element={<EditData data={data} setData={setData} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
