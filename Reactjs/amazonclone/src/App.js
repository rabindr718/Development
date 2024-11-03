import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import Header from "./components/header/Header";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Home />
      </div>
    </BrowserRouter>
  );
}

export default App;
