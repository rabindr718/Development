import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import DetailsPage from "./Components/OrderCart/SelectedItem";
import Counter from "./Components/Home/Counter";
function App() {
  return (
    <div className="App">
      <Counter />
      {/* <Header /> */}
      {/* <Home /> */}
    </div>
  );
}

export default App;

// import "./App.css";
// import Header from "./Components/Header/Header";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Components/Home/Home";
// import DetailsPage from "./Components/OrderCart/DetailsPage";
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/details" element={<DetailsPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
