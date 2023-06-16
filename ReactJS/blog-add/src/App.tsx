import React from "react";
import AddBlog from "./components/AddBlog";
import BlogDisplay from "./components/ShowBlog";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store/store"; // Make sure you import your Redux store

import Home from "./Home";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AddBlog" element={<AddBlog />} />
            <Route path="/ShowBlog" element={<BlogDisplay />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

// import React from 'react';
// import { Provider } from 'react-redux';
// import store from './store';
// import AddBlog from './AddBlog';
// import BlogDisplay from './BlogDisplay';

// const App: React.FC = () => {
//   return (
//     <Provider store={store}>
//       <div>
//         <h1>Add Blog</h1>
//         <AddBlog />
//         <h1>Blog Display</h1>
//         <BlogDisplay />
//       </div>
//     </Provider>
//   );
// };

// export default App;
