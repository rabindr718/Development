import "./App.css";
import { useState } from "react";

function App() {
  const [intial, setIntial] = useState(0);

  const CounterIncrease = () => {
    setTimeout(setIntial(intial + 5), 2000);
    Promise.resolve().then();
  };

  const CounterDecrease = () => {
    setIntial(intial - 5);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="displayCount">
          <span onClick={CounterDecrease}> Subtract</span>
          <span>{intial}</span>
          <span onClick={CounterIncrease}>Add</span>
        </div>
      </header>
    </div>
  );
}

export default App;
