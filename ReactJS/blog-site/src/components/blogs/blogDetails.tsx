import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import classes from "./blogDetails.module.css";
import Navigation from "../navigation/navbar";
import { useNavigate } from "react-router-dom";

const BlogDetails: React.FC = () => {
  const navigate = useNavigate();
  const [blogAvailable, setBlogAvailable] = useState(true);
  const [delet, setBlogList] = useState(" ");
  const [updat, setUpdateBlog] = useState("");

  const data = localStorage.getItem("BlogData");
  const localStoreData = JSON.parse(data as string);

  const id = Object.entries(localStoreData);
  console.log(id);

  // console.log(localStoreData);
  // console.log(typeof localStoreData);

  //
  //
  //
  //
  ///
  //
  //
  //
  //
  //
  const UpdateBlogHandler = (ids: any) => {
    console.log(ids.target.id);
    const data = localStorage.getItem("BlogData");
    const localStoreData = JSON.parse(data as string);

    const { plainText } = localStoreData[0];
    console.log(plainText, localStoreData);
    console.log(ids.target.id);
    localStoreData.forEach((x: any) => {
      console.log(x.id);
    });
    const j = localStoreData.find((x: any) => x.id === 50);
    console.log(j);
  };

  //
  ///
  //
  //
  //
  //
  //
  ///
  ///
  ///
  ///
  ///
  ///
  //

  const DeleteBlogHandler = (ids: any) => {
    setBlogList("");
  };

  const paginationNext = () => {
    navigate("/");
  };
  const paginationPrevious = () => {
    navigate("/");
  };

  return (
    <div>
      <Navbar bg="primary" variant="bg">
        <Nav className="me-auto">
          <Navigation />
        </Nav>
      </Navbar>

      {blogAvailable && (
        <div className={classes.showPage}>
          {localStoreData.map((e: any, id: any) => (
            <div key={id}>
              <Modal.Title>
                <h5>Show Blog</h5>
                <h1>{e.title}</h1>
              </Modal.Title>
              <p className={classes.date}>Published Date : {" " + e.date}</p>
              <div className={classes.image}>
                <img src={e.file} height="300" width="770"></img>
              </div>
              <p>{e.plainText}</p>
              <p className={classes.author}>
                <strong>
                  <i>Author ~ {e.authorUser}</i>
                </strong>
              </p>
              <div className="deleteUpdate justify-content-center">
                <Button variant="danger secondary" onClick={DeleteBlogHandler}>
                  Delete
                </Button>{" "}
                <Button variant="success primary" onClick={UpdateBlogHandler}>
                  Edit
                </Button>
              </div>
              <footer>
                <div className={classes.pagination}>
                  <Button onClick={paginationPrevious} variant="info primary">
                    Previous
                  </Button>{" "}
                  <Button onClick={paginationNext} variant="info primary">
                    Next
                  </Button>
                </div>
              </footer>
              <hr className={classes.blogSpace}></hr>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogDetails;

// const nextHandler = (event) => {
//   event.preventDefault();

//   if (idForNextPrev < blogList.length - 1 && blogList.length - 1 > 0) {
//     setIdForNextPrev(idForNextPrev + 1);
//     setDis(false);
//     if (idForNextPrev === blogList.length - 2) {
//       setndis(true);
//     }
//   } else if (idForNextPrev === blogList.length - 1 || blogList.length === 1) {
//     setndis(true);
//   }
//   console.log(idForNextPrev);
// };

// const prevHandler = (event) => {
//   event.preventDefault();

//   if (idForNextPrev <= blogList.length && idForNextPrev > 0) {
//     setndis(false);
//     setIdForNextPrev(idForNextPrev - 1);
//     if (idForNextPrev === 1) {
//       setDis(true);
//     }
//   } else if (idForNextPrev === 0) {
//     console.log(`dis index : ${idForNextPrev}`);
//     setDis(true);
//   }
