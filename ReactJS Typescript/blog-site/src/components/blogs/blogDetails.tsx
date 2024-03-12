import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import classes from "./blogDetails.module.css";
import Navigation from "../navigation/navbar";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
const BlogDetails: React.FC = () => {
  const navigate = useNavigate();
  const [blogAvailable, setBlogAvailable] = useState(true);
  const [delet, setBlogList] = useState(" ");

  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [author, setAuthor] = useState("");
  const editor = useRef(null);
  const [isPublished, setIsPublished] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const data = localStorage.getItem("BlogData");
  const localStoreData = JSON.parse(data as any);
  console.log("Here Data", localStoreData);
  const DeleteBlogHandler = (id: any) => {
    console.log(id);
    const updatedData = localStoreData.filter((item: any) => item.id !== id);
    localStorage.setItem("BlogData", JSON.stringify(updatedData));
    setBlogList(updatedData);
  };

  const paginationNext = () => {
    navigate("/");
  };
  const paginationPrevious = () => {
    navigate("/");
  };

  // const EditBlogHandler = (id: any) => {
  //   const selectedBlog = localStoreData.filter((blog: any) => blog.id === id);
  //   if (selectedBlog.length > 0) {
  //     selectedBlog.forEach((blog: any) => {
  //       console.log("Title:", blog.title);
  //       console.log("Selected:", blog.selected);
  //       console.log("ID:", blog.id);
  //       console.log("PlainText:", blog.plainText);
  //       console.log("Author:", blog.authorUser);
  //       console.log("Date:", blog.date);
  //       console.log(typeof selectedBlog);
  //     });
  //     navigate(`/AddBlogs/${selectedBlog[0].id}`, {
  //       state: { selectedBlog: selectedBlog },
  //     });

  //     console.log(selectedBlog[0].id);
  //   }
  // };

  // import { useNavigate } from 'react-router-dom';

  const EditBlogHandler = (id: any) => {
    const selectedBlog = localStoreData.find((blog: any) => blog.id === id);

    if (selectedBlog) {
      // Extract necessary data from selectedBlog
      const { title, selected, file, plainText, authorUser, date } =
        selectedBlog;
      console.log(selectedBlog, "Here selected");
      // Encode data as URL parameters
      const queryParams = new URLSearchParams({
        id: selectedBlog.id,
        title,
        file,
        selected,
        plainText,
        authorUser,
        date,
      });
      console.log(file);

      // Navigate to AddBlogs component with encoded URL parameters
      navigate(`/AddBlogs?${queryParams.toString()}`);
    } else {
      console.log("Blog not found");
    }
  };

  const localStorageData = JSON.parse(
    localStorage.getItem("LoginData") as string
  );
  const username =
    localStorageData.username.charAt(0).toUpperCase() +
    localStorageData.username.substring(1);
  console.log(username);
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
                <h1 data-value={title}>{(e as any).title}</h1>
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
                <Button
                  variant="danger secondary"
                  onClick={() => DeleteBlogHandler(e.id)}
                >
                  Delete
                </Button>{" "}
                <Button
                  variant="success primary"
                  onClick={() => EditBlogHandler(e.id)}
                >
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

// setIsEditMode(true);
//     // Here Copy and Edit Code From Add Blog Handler
//     const parser = new DOMParser();
//     const htmlDocument = parser.parseFromString(description, "text/html");
//     const plainText = htmlDocument.body.textContent;

//     const BlogData = {
//       id: Math.floor(Math.random() * 100 + 1),
//       Date,
//       plainText,
//       title,
//       authorUser: author,
//       file,
//       selected,
//     };
//     console.log(BlogData);

//     let blogsString = localStorage.getItem("BlogData");
//     if (!blogsString) {
//       blogsString = "[]";
//     }
//     const blogs = JSON.parse(blogsString);
//     blogs.push(BlogData);
//     localStorage.setItem("BlogData", JSON.stringify(blogs));
//     // The End

//     navigate(`/AddBlogs/${BlogData.id}`);
