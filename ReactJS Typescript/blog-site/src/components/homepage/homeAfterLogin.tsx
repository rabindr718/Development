import Navigation from "../navigation/navbar";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import classes from "./afterlogi.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
const HomeAfterLogin: React.FC = () => {
  const [dataAvailable, setDataAvailable] = useState(false);
  const [delet, setBlogList] = useState(" ");
  const [updat, setUpdateBlog] = useState("");
  const navigate = useNavigate();
  const data = localStorage.getItem("BlogData");
  let localStoreData = JSON.parse(data as string);

  const localStorageData = JSON.parse(
    localStorage.getItem("LoginData") as string
  );
  const UpdateBlogHandler = (ids: any) => {
    setUpdateBlog(
      localStoreData.find((updateNow: any) => updateNow.id === ids)
    );
    navigate("/AddBlogs");
  };
  const DeleteBlogHandler = (ids: any) => {
    setBlogList(
      localStoreData.filter((deleteNow: any) => +deleteNow.id !== +ids)
    );
  };
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
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <b>{e.title}</b>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className={classes.bodyStyle}>
                      <p className={classes.date}>
                        Published Date: {" " + e.date}
                      </p>
                      <div className={classes.image}>
                        <img src={e.file} height="190" width="330" alt="" />
                      </div>
                      <p>{e.plainText}</p>
                      <p className={classes.author}>
                        <strong>
                          <i>Author ~ {e.authorUser}</i>
                        </strong>
                      </p>
                      <div className="deleteUpdate justify-content-center">
                        <Button
                          variant="danger secondary"
                          onClick={DeleteBlogHandler}
                        >
                          Delete
                        </Button>{" "}
                        <Button
                          variant="success primary"
                          onClick={UpdateBlogHandler}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <p className={classes.date}>Published Date: {" " + e.date}</p>
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
