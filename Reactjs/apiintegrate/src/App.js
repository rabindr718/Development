import Login from "./Components/Login/Login";
import "./App.css";
import APICalling from "./Components/API_Data/APICalling";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Login /> */}
        <APICalling />
      </header>
    </div>
  );
}

export default App;
