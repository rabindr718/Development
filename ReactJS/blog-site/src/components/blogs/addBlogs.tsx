import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import classes from "../blogs/addpage.module.css";
import Button from "react-bootstrap/Button";
import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import Navigation from "../navigation/navbar";
import { useNavigate } from "react-router-dom";
import validator from "validator";
const AddBlogs: React.FC = (props: any) => {
  const data = localStorage.getItem("keys");
  const login = JSON.parse(data as string);
  let new_Date: Date = new Date();
  const date: string = `${new_Date.getDate()}/${
    new_Date.getMonth() + 1
  }/${new_Date.getFullYear().toLocaleString()}`;

  // let date: string = new_Date.toLocaleString();

  const [title, setTitle] = useState(" ");
  const [selected, setSelectValue] = useState("");
  const [file, setFile] = useState("");
  const [author, setAuthor] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const editor = useRef(null);
  const { blog, setBloggingList, UpdateBlog, setUpdateBlog } = props;

  const [description, setdescription] = useState("");
  const navigate = useNavigate();

  const updatenewData = (
    ids: string | number,
    title: any,
    discription: any,
    file: any,
    author: any,
    publishDate: any,
    tags: any
  ) => {
    setBloggingList(
      blog.map((d: any) =>
        +d.id === +ids
          ? {
              id: ids,
              Title: title,
              Description: discription,
              Images: file,
              Author: author,
              PublishDate: publishDate,
              Tags: tags,
            }
          : d
      )
    );
    setUpdateBlog("");
  };
  const handleSelect = (data: any) => {
    setSelectValue(data);
  };
  const fileHandler = (e: any) => {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const AddBlogsHandler = (e: any) => {
    e.preventDefault();
    console.log(title);
    console.log(description);

    console.log(author);
    console.log(file);
    e.preventDefault();
    if (
      title.trim().length === 0 ||
      description.trim().length === 0 ||
      file === "" ||
      setSelectValue.length === 0
    ) {
      setErrorMsg("Hi, ");
    } else if (!validator.isAlpha(title)) {
      setErrorMsg("Not valid");
    } else {
      if (!UpdateBlog) {
        setBloggingList([
          ...blog,
          {
            id: blog.length,
            Title: title,
            Description: description,
            Images: file,
            Author: login[0].FullName,
            PublishDate: date,
            Tags: setSelectValue,
          },
        ]);
        alert("Blog is Publish");
      } else {
        updatenewData(
          +UpdateBlog.id,
          title,
          description,
          file,
          login[0].FullName,
          date,
          selected
        );
        navigate("/HomeAfterLogin");
      }
      setTitle("");
      setdescription("");
      setSelectValue("");
      setErrorMsg("");
      console.log(blog);
    }
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
              multiple
              onChange={(event) => setFile(event.target.value)}
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
          <div className="mb-3">
            <input
              className="form-control"
              id="formFileMultiple"
              multiple
              onChange={(event) => setAuthor(event.target.value)}
              disabled={true}
              placeholder={login[0].fullname}
            />
          </div>
        </div>
        <footer>
          <div className="deleteUpdate justify-content-center">
            <Button variant="danger secondary " onClick={closePageHandler}>
              Exit
            </Button>{" "}
            <Button variant="success primary" onClick={AddBlogsHandler}>
              Publish
            </Button>
          </div>
        </footer>
      </form>
    </>
  );
};

export default AddBlogs;
