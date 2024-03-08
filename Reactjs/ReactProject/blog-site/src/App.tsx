import "./App.css";
import { Routes, Route } from "react-router-dom";
import Registration from "./authentication/registration";
import Login from "./authentication/login";
import AddBlogs from "./components/blogs/addBlogs";
import BlogDetails from "./components/blogs/blogDetails";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/AddBlogs" element={<AddBlogs />} />
        <Route path="/BlogDetails" element={<BlogDetails />} />
        <Route path="/AddBlogs" element={<AddBlogs />} />
        <Route />
      </Routes>
    </div>
  );
}
export default App;
