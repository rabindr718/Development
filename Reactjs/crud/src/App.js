import "./App.css";
import Add from "./FORM/Add";
import Home from "./FORM/Home";
import Edit from "./FORM/Edit";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/create" element={<Add></Add>}></Route>
            <Route path="/edit" element={<Edit></Edit>}></Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
