import logo from './logo.svg';
import React, { useState, Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

const AddBlog = React.lazy(() => import('./component/AddBlog'));
const ShowBlog = React.lazy(() => import('./component/ShowBlog'));
const Login = React.lazy(() => import('./component/Login'));
const Home = React.lazy(() => import('./component/Home'));
const Reg = React.lazy(() => import('./component/Reg'));
const HomeTable = React.lazy(() => import('./component/HomeTable'));

function App() {
  const [regList, setregList] = useState([]);
  const [blogList, setBlogList] = useState([]);
  const [updateBlog, setUpdateBlog] = useState(null);
  return (
    <>
      <Home blogList={blogList} />
      <Suspense>
        <Routes>
          <Route
            path="/home"
            element={
              <HomeTable
                blogList={blogList}
                setBlogList={setBlogList}
                setUpdateBlog={setUpdateBlog}
              />
            }
          />
          <Route
            path="/addblog"
            element={
              <AddBlog
                blogList={blogList}
                setBlogList={setBlogList}
                setUpdateBlog={setUpdateBlog}
                updateBlog={updateBlog}
              />
            }
          />
          <Route
            path="/showblog"
            element={
              <ShowBlog
                blogList={blogList}
                setBlogList={setBlogList}
                setUpdateBlog={setUpdateBlog}
                updateBlog={updateBlog}
              />
            }
          />
          <Route path="/login" element={<Login regList={regList} />} />
          <Route
            path="/reg"
            element={<Reg regList={regList} setregList={setregList} />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
// url : https://blogsite-2b01f.web.app/
