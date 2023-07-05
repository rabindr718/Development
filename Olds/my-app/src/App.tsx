import "./App.css";
import Home from "./components/homepage/home";
import { Routes, Route } from "react-router-dom";
import Registration from "./authentication/registration";
import Login from "./authentication/login";
import AddBlogs from "./components/blogs/addBlog";
import BlogDetails from "./components/blogs/blogDetails";
import HomeAfterLogin from "./components/homepage/homeAfterLogin";
import React from "react";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/AddBlogs" element={<AddBlogs />} />
        <Route path="/BlogDetails" element={<BlogDetails />} />
        <Route path="/HomeAfterLogin" element={<HomeAfterLogin />} />
        <Route />
      </Routes>
    </div>
  );
}
export default App;
