import logo from "./logo.svg";
import "./App.css";
import CustomHook from "./components/CustomHook";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit src/App.js and save to reload.</p>
        <CustomHook></CustomHook>
        <a>Learn React</a>
      </header>
    </div>
  );
}

export default App;
