import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import classes from "./blogDetails.module.css";
import Navigation from "../navigation/navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const BlogDetails: React.FC = () => {
  const navigate = useNavigate();
  const [blogAvailable, setBlogAvailable] = useState(true);
  const [delet, setBlogList] = useState(" ");
  const [updat, setUpdateBlog] = useState("");

  const data = localStorage.getItem("BlogData");
  const localStoreData = JSON.parse(data as any);

  const DeleteBlogHandler = (id: any) => {
    console.log(id);
    const updatedData = localStoreData.filter((item: any) => item.id !== id);
    localStorage.setItem("BlogData", JSON.stringify(updatedData));
    setBlogList(updatedData);
  };

  // const UpdateBlogHandler = (id: any, username: string, blogData: string, textArea: string) => {
  //   // Find the blog to update based on the given id
  //   const blogToUpdate = localStoreData.find((item: any) => item.id === id);

  //   if (blogToUpdate) {
  //     // Update the properties of the blog object with the new data
  //     blogToUpdate.username = username;
  //     blogToUpdate.blogData = blogData;
  //     blogToUpdate.textArea = textArea;

  //     // Assuming the navigation function is correct, you can pass the updated blogData as a state to the target route
  //     navigate(`/AddBlogs/${id}`, { state: { blogData: blogToUpdate } });
  //     console.log(id);
  //   } else {
  //     console.log('Blog not found with the given id');
  //   }
  // };

  // const UpdateBlogHandler = (id: any) => {
  //   const blogToUpdate = localStoreData.find((item: any) => item.id === id);
  //   if (blogToUpdate) {

  //     navigate(`/AddBlogs/${id}`);
  //     console.log(id);
  //   }
  // };
  const UpdateBlogHandler = (id: any) => {
    const blogToUpdate = localStoreData.find((item: any) => item.id === id);
    if (blogToUpdate) {
      navigate(`/AddBlogs/${id}`, { state: { blogData: blogToUpdate } });
      console.log(id);
    }
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
                <Button
                  variant="danger secondary"
                  onClick={() => DeleteBlogHandler(e.id)}
                >
                  Delete
                </Button>{" "}
                <Button
                  variant="success primary"
                  onClick={() => UpdateBlogHandler(e.id)}
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

  // const UpdateBlogHandler = (id: any, username: string, blogData: string, textArea: string) => {
  //   // Find the blog to update based on the given id
  //   const blogToUpdate = localStoreData.find((item: any) => item.id === id);

  //   if (blogToUpdate) {
  //     // Update the properties of the blog object with the new data
  //     blogToUpdate.username = username;
  //     blogToUpdate.blogData = blogData;
  //     blogToUpdate.textArea = textArea;

  //     // Assuming the navigation function is correct, you can pass the updated blogData as a state to the target route
  //     navigate(`/AddBlogs/${id}`, { state: { blogData: blogToUpdate } });
  //     console.log(id);
  //   } else {
  //     console.log('Blog not found with the given id');
  //   }
  // };

  // const UpdateBlogHandler = (id: any) => {
  //   const blogToUpdate = localStoreData.find((item: any) => item.id === id);
  //   if (blogToUpdate) {

  //     navigate(`/AddBlogs/${id}`);
  //     console.log(id);
  //   }
  // };