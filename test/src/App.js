import logo from "./logo.svg";
import "./App.css";
import Example from "./Example";
import classes from "./app.module.css";
import ShareButton from "./Component";
import CopyButton from "./Compy";
function App() {
  return (
    <div className={classes.application}>
      <CopyButton />
    </div>
  );
}

export default App;
