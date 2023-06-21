import Navigation from "../navigation/navbar";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import classes from "./afterlogi.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const HomeAfterLogin: React.FC = () => {
  const [dataAvailable, setDataAvailable] = useState(false);


  const navigate = useNavigate();
  const data = localStorage.getItem("BlogData");
  let localStoreData = JSON.parse(data as string);

  const localStorageData = JSON.parse(
    localStorage.getItem("LoginData") as string
  );


  const username =
    localStorageData.username.charAt(0).toUpperCase() +
    localStorageData.username.substring(1);
  console.log(username);
  useEffect(() => {
    const myData = localStorage.getItem("BlogData");
    setDataAvailable(myData !== null);
  }, []);
  const showBlogHandler = (e: any) => {
    e.preventDefault();
    navigate("/BlogDetails");
  };
  return (
    <div>
      <div>
        <Navbar bg="primary" variant="bg">
          <Nav className="me-auto">
            <span>
              <Navigation />
            </span>
          </Nav>
          <div className={classes.loginName}>
            Hello <strong>{username} </strong>
          </div>
        </Navbar>
      </div>
      {dataAvailable ? (
        <div>
          {localStoreData?.map((e: any, id: any) => (
            <div key={id}>
              <p className={classes.date}>Published Date: {" " + e.date}</p>
              <div className={classes.image}>
                <img src={e.file} height="300" width="770" alt="" />
              </div>
              <p>{e.plainText}</p>
              <p className={classes.author}>
                <strong>
                  <i>Author ~ {e.authorUser}</i>
                </strong>
                f
              </p>
              <div className="text-center">
                <Button
                  variant="dark primary"
                  type="button"
                  onClick={showBlogHandler}
                >
                  See All Blogs...
                </Button>
              </div>
              <hr className={classes.blogSpace} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1>No data in localStorage</h1>
          <p>Please provide some data.</p>
        </div>
      )}
    </div>
  );
};

export default HomeAfterLogin;

/* <div>
            {localStoreData?.map((e: any, id: any) => (
              <div key={id}>
                <p className={classes.date}>Published Date: {" " + e.date}</p>
                <div className={classes.image}>
                  <img src={e.file} height="300" width="770" alt="" />
                </div>
                <p>{e.plainText}</p>
                <p className={classes.author}>
                  <strong>
                    <i>Author ~ {e.authorUser}</i>
                  </strong>f
                </p>
                <hr className={classes.blogSpace} />
              </div>
            ))}
          </div> */

// const data = localStorage.getItem("BlogData");
//   let localStoreData = JSON.parse(data as string);

//   if (!localStoreData) {
//     localStoreData = "[]";
//   }
//   const x = localStoreData.length;
//   console.log(x);
//   const localStorageData = JSON.parse(
//     localStorage.getItem("LoginData") as string
//   );
//   console.log(typeof localStoreData);
//   const username =
//     localStorageData.username.charAt(0).toUpperCase() +
//     localStorageData.username.substring(1);

//   console.log(username);
//   return (

/* <div>
  <Navbar bg="primary" variant="bg">
    <Nav className="me-auto">
      <span>
        <Navigation />
      </span>
    </Nav>
    <div className={classes.loginName}>
      Hello <strong>{username} </strong>
    </div>
  </Navbar>
  <div className={classes.homeShow}>{"  " + username}</div>

  {/* <div>{localStoreData.length === 0 && <h2>Let's Add Some Blogs </h2>}</div> */

//   <div></div>
// </div>; */}
//   );
// };
