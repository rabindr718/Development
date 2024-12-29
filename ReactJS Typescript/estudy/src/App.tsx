// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
// // import MainPage from "./Components/MainPage/MainPage";
// // import Footer from "./Layout/Footer/Footer";
// // import Header from "./Layout/Header/Header";
// // import Navbar from "./Layout/Header/Navbar";
// // import LeftSidebar from "./Layout/Sidebars/LeftSidebar";
// // import RightSidebar from "./Layout/Sidebars/RightSiderbar";
// import Login from "./Users/User/Login";
// import MainLayout from "./Components/MainPage/MainLayout";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/Login" element={<Login />}></Route>
//         <Route path="/Homepage" element={<MainLayout />}></Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
// App.tsx
import React from "react";

const App = () => {
  return (
    <div style={{ height: "100vh", margin: 0 }}>
      {" "}
      {/* Full-screen container */}
      <iframe src="/RABINDRA_in_Germany.pdf" />
    </div>
  );
};

export default App; // Ensure you're using 'export default App'
