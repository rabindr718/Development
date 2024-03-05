import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import classes from "../blogs/addpage.module.css";
import Button from "react-bootstrap/Button";
import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import Navigation from "../navigation/navbar";
import { useNavigate, useLocation } from "react-router-dom";

const AddBlogs: React.FC = () => {
  const [updateBlog, setUpdateBlog] = useState(null);

  let new_Date: Date = new Date();
  const date: string = `${new_Date.getDate()}/${
    new_Date.getMonth() + 1
  }/${new_Date.getFullYear()}`;

  const [title, setTitle] = useState("");
  const [selected, setSelectValue] = useState("");
  const [file, setFile] = useState("");
  const [author, setAuthor] = useState("");
  const editor = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const location = useLocation();
  const blogData = location.state?.blogData;
  const navigate = useNavigate();

  useEffect(() => {
    if (blogData) {
      setTitle(blogData.title);
      setSelectValue(blogData.selected);
      setFile(blogData.file);
      setAuthor(blogData.authorUser);
      setIsEditMode(true);
    }
  }, [blogData]);

  const handleDeleteClick = () => {
    // Perform action when Delete button is clicked
    // ...
  };

  const handlePublishClick = () => {
    setIsPublished(true);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    setIsPublished(false);
  };

  const [description, setdescription] = useState("");

  const fileInput = (event: any) => setFile(event.target.value);

  const fileHandler = (e: any) => {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const fileFetchHandler = function (e: any) {
    fileInput(e);
    fileHandler(e);
  };

  const parser = new DOMParser();
  const htmlDocument = parser.parseFromString(description, "text/html");
  const plainText = htmlDocument.body.textContent;
  // Handle Add Blog Here
  const AddBlogsHandler = (e: any) => {
    e.preventDefault();
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(description, "text/html");
    const plainText = htmlDocument.body.textContent;

    const BlogData = {
      id: Math.floor(Math.random() * 100 + 1),
      date,
      plainText,
      title,
      authorUser: author,
      file,
      selected,
    };
    console.log(BlogData);

    let blogsString = localStorage.getItem("BlogData");
    if (!blogsString) {
      blogsString = "[]";
    }
    const blogs = JSON.parse(blogsString);
    blogs.push(BlogData);
    localStorage.setItem("BlogData", JSON.stringify(blogs));
    navigate("/HomeAfterLogin");
  };

  // const handleEditClick = (e: any) => {
  //   setIsEditMode(true);
  //   //Here Copy and Edit Code From Add Blog Handler
  //   const parser = new DOMParser();
  //   const htmlDocument = parser.parseFromString(description, "text/html");
  //   const plainText = htmlDocument.body.textContent;

  //   const BlogData = {
  //     id: Math.floor(Math.random() * 100 + 1),
  //     date,
  //     plainText,
  //     title,
  //     authorUser: author,
  //     file,
  //     selected,
  //   };
  //   console.log(BlogData);

  //   let blogsString = localStorage.getItem("BlogData");
  //   if (!blogsString) {
  //     blogsString = "[]";
  //   }
  //   const blogs = JSON.parse(blogsString);
  //   blogs.push(BlogData);
  //   localStorage.setItem("BlogData", JSON.stringify(blogs));

  //   // The End
  //   console.log(e.id, "this is id");
  //   navigate(`/AddBlogs/${BlogData.id}`);
  // };

  const handleEditClick = () => {
    setIsEditMode(true);

    // Copying and editing code from Add Blog Handler to populate the fields
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(description, "text/html");
    const plainText = htmlDocument.body.textContent;

    const BlogData = {
      id: Math.floor(Math.random() * 100 + 1), // Assuming you're generating a new ID for editing
      date,
      plainText,
      title,
      authorUser: author,
      file,
      selected,
    };
    console.log(BlogData);

    // Update the local storage with the edited data
    let blogsString = localStorage.getItem("BlogData");
    if (!blogsString) {
      blogsString = "[]";
    }
    const blogs = JSON.parse(blogsString);
    // Replace the existing blog with the edited one or add a new one if it doesn't exist
    const index = blogs.findIndex(
      (blog: { id: number }) => blog.id === BlogData.id
    );
    if (index !== -1) {
      blogs[index] = BlogData;
    } else {
      blogs.push(BlogData);
    }
    localStorage.setItem("BlogData", JSON.stringify(blogs));

    // Navigate to the edit page with the ID of the edited blog
    navigate(`/AddBlogs/${BlogData.id}`);
  };

  const closePageHandler = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar bg="primary" variant="bg">
        <Nav className="me-auto">
          <Navigation />
        </Nav>
      </Navbar>
      <form className={classes.showPage}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            <h2> Title</h2>
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Write Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            <strong> Write Here Descrition</strong>
          </label>
          <div className="text-editor">
            <JoditEditor
              ref={editor}
              value={description}
              onChange={(content) => {
                setdescription(content);
              }}
            />
          </div>
        </div>
        <div>
          <div className="mb-3">
            <label htmlFor="formFileMultiple" className="form-label">
              Multiple files input example
            </label>
            <input
              className="form-control"
              type="file"
              id="formFileMultiple"
              onChange={fileFetchHandler}
            />
          </div>
          <Form.Group className="input-group">
            <Form.Select
              className="form-control"
              value={selected}
              onChange={(e) => setSelectValue(e.target.value)}
            >
              <option value="Version">Version</option>
              <option value="Update 2">Update 2</option>
              <option value="Update 3">Update 3</option>
              <option value="Update 4">Update 4</option>
            </Form.Select>
          </Form.Group>
          <br />
          <div className="mb-3">
            <label htmlFor="formFileMultiple" className="form-label">
              Author{" "}
            </label>
            <input
              className="form-control"
              id="formFileMultiple"
              onChange={(event) => setAuthor(event.target.value)}
              disabled={!isEditMode}
              value={author}
              placeholder={author}
            />
          </div>
        </div>
        <footer>
          <div className="deleteUpdate justify-content-center">
            <div>
              <button onClick={AddBlogsHandler}>Submit</button>

              {!isEditMode && <button onClick={handleEditClick}>Edit</button>}
              {isEditMode && (
                <>
                  <button onClick={handleCancelClick}>Cancel</button>{" "}
                  {/* <button onClick={handleDeleteClick}>Delete</button> */}
                  {/* <button onClick={AddBlogsHandler}>Update</button> */}
                </>
              )}
            </div>

            {/* {isEditMode && (

            )} */}

            <div>
              {/* <button onClick={handlePublishClick}>Publish</button> */}
            </div>

            {/* <Button variant="danger secondary " onClick={closePageHandler}>
              Exit
            </Button>{" "}
            <Button variant="primary" onClick={AddBlogsHandler}>
              {updateBlog ? "Update" : "Publish"}
            </Button> */}
          </div>
        </footer>
      </form>
    </>
  );
};

export default AddBlogs;
