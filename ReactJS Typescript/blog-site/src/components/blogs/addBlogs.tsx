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
  let new_Date: Date = new Date();
  const date: string = `${new_Date.getDate()}/${
    new_Date.getMonth() + 1
  }/${new_Date.getFullYear()}`;

  const location = useLocation();

  // Now, you can safely access the selected blog object as `blog` in this component
  const [description, setdescription] = useState("");
  const navigate = useNavigate();
  // Default to empty string if null

  const [selected, setSelectValue] = useState("");
  const [file, setFile] = useState("");
  const [author, setAuthor] = useState(" ");
  const editor = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const localStorageData = JSON.parse(
    localStorage.getItem("LoginData") as string
  );
  const username =
    localStorageData.username.charAt(0).toUpperCase() +
    localStorageData.username.substring(1);

  // Retrieve data from URL parameters
  const queryParams = new URLSearchParams(location.search);

  // const Editedtitle = queryParams.get("title") || "";
  const id = queryParams.get("id") || "";
  const EditedSelect = queryParams.get("selected") || "";
  const EditedText = queryParams.get("plainText") || "";
  const EditedFile = queryParams.get("file") || ""; // Default to empty string if null

  //Here for Title update
  const [Editedtitle, setEditedtitle] = useState(
    queryParams.get("title") || ""
  );

  // const [title, setTitle] = useState<string>(queryParams.get("title") || "");
  const EditedauthorUser = queryParams.get("authorUser") || "";
  const Editeddate = queryParams.get("date") || "";

  // Use the retrieved data as needed
  console.log("ID:", id);
  // console.log("Title:", title);
  console.log("Selected:", EditedSelect);
  console.log("PlainText:", EditedText);
  console.log(EditedFile);
  console.log("Author:", EditedauthorUser);
  console.log("Date:", Editeddate);

  const handlePublishClick = () => {
    setIsPublished(true);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    setIsPublished(false);
  };

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

    let BlogData = {
      id: Math.floor(Math.random() * 100 + 1),
      date,
      plainText,
      Editedtitle,
      authorUser: username,
      file,
      selected,
    };
    console.log("Add LOG FUNCTION", BlogData.selected);

    let blogsString = localStorage.getItem("BlogData");
    if (!blogsString) {
      blogsString = "[]";
    }
    const blogs = JSON.parse(blogsString);
    blogs.push(BlogData);
    localStorage.setItem("BlogData", JSON.stringify(blogs));
    navigate("/HomeAfterLogin");
  };

  const handleEditClick = () => {
    setIsEditMode(true);

    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(description, "text/html");
    const plainText = htmlDocument.body.textContent;

    let BlogData = {
      id: Math.floor(Math.random() * 100 + 1),
      date,
      plainText,
      Editedtitle: Editedtitle,
      authorUser: username,
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
            value={Editedtitle}
            onChange={(e) => {
              setEditedtitle(e.target.value);
            }}
          />
          {/* <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Write Title"
            value={Editedtitle}
            onChange={(e) => setUserTitle(e.target.value)}
          /> */}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            <strong> Write Here Descrition</strong>
          </label>
          <div className="text-editor">
            <JoditEditor
              ref={editor}
              value={EditedText}
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
              {...(EditedFile && <span>{EditedFile}</span>)}
              value={EditedFile ? EditedFile : EditedFile}
              onChange={fileFetchHandler}
            />
          </div>
          <Form.Group className="input-group">
            <Form.Select
              className="form-control"
              value={EditedSelect}
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
              value={username}
              placeholder={username}
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
