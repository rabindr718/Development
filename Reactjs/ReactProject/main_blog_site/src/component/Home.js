import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Home = (props) => {
  const { blogList } = props;
  const nav = useNavigate();
  const LogoutHandler = () => {
    localStorage.removeItem('userLogin');
    nav('/Home');
  };
  const getlogindata = JSON.parse(localStorage.getItem('userLogin'));
  console.log(getlogindata);
  return (
    <>
      <nav class="navbar bg-body-tertiary">
        <form class="container-fluid justify-content-start">
          {getlogindata && (
            <h2 style={{ color: 'blue' }}>
              Welcome {getlogindata[0].UserName} <br />
            </h2>
          )}
          <NavLink to="/Home">
            <button class="btn btn-outline-success me-3" type="button">
              Home
            </button>
          </NavLink>
          {getlogindata && (
            <>
              <NavLink to="/AddBlog">
                <button class="btn btn-outline-success me-3" type="button">
                  Add Blog
                </button>
              </NavLink>
              <NavLink to="/ShowBlog">
                <button class="btn btn-outline-success me-3" type="button">
                  Show Blog
                </button>
              </NavLink>

              <button
                class="btn btn-outline-success me-3"
                type="button"
                onClick={LogoutHandler}
              >
                Logout
              </button>
            </>
          )}
          {!getlogindata && (
            <>
              <NavLink to="/Login">
                <button class="btn btn-outline-success me-3" type="button">
                  Login
                </button>
              </NavLink>
            </>
          )}
          {console.log(blogList)}
        </form>
      </nav>
    </>
  );
};
export default Home;
