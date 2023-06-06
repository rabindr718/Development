import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import Navigation from "../navigation/navbar";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const AddBlogs: React.FC = () => {
  const editor = useRef(null);

  const optionList = [
    {
      value: "#JAVA",
      label: "Java",
    },
    {
      value: "#Version 1.8",
      label: "Version 1.8",
    },
    {
      value: "#ReactJS",
      label: "ReactJS",
    },
    {
      value: "#HTML",
      label: "HTML",
    },
  ];

  const [description, setdescription] = useState("");
  const navigate = useNavigate();

  const getData = (e: any) => {
    const { value } = e.target;
    console.log(value);
    selectedropDown();
  };

  const AddBlogsHandler = (e: any) => {
    e.preventDefault();
    console.log(editor.current);
  };

  const closePageHandler = () => {
    navigate("/");
  };

  const selectedropDown = () => {};
  const fetchToolbarData = () => {
    setdescription(description);
  };
  console.log(fetchToolbarData.toString);
  console.log(editor.current);

  return (
    <>
      <Navbar bg="primary" variant="bg">
        <Nav className="me-auto">
          <Navigation />
        </Nav>
      </Navbar>
      <div ></div>
      <form >
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            <h2> Title</h2>
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Write Title"
            onChange={getData}
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
              onChange={fetchToolbarData}
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
              onChange={getData}
            />
          </div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Select
              aria-label="Default select example"
              options={optionList}
              placeholder="Select color"
              onChange={selectedropDown}
              isMulti
            ></Select>
          </Form.Group>
          <div className="mb-3">
            <input
              className="form-control"
              id="formFileMultiple"
              multiple
              onChange={getData}
              disabled
              value="Author"
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
            {/* <Button variant="primary" onClick={publishHandler}>
              {updateBlog ? "Update" : "Publish"}
            </Button> */}
          </div>
        </footer>
      </form>
    </>
  );
};

export default AddBlogs;
