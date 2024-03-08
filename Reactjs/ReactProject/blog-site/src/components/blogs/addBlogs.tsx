import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import ToolBar from "./toolBar";
import classes from "./addDetails.module.css";

const AddBlogs: React.FC = () => {
  return (
    <div className={classes.showAdd}>
      <Navbar bg="primary" variant="bg">
        <Nav className="me-auto">
          <Button variant="primary">Add Blog</Button>
        </Nav>
      </Navbar>
      <body>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Title"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              <strong> Write Here Descrition</strong>
            </label>
            <div className="text-editor">
              <ToolBar />
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
              />
            </div>
            <Form.Group className="mb-3">
              <label>Author Name</label>
              <input placeholder="Disabled input" disabled />
            </Form.Group>
          </div>
        </form>
      </body>
      <footer>
        <Button variant="danger secondary">Exit</Button>
        <Button variant="success primary">Publish</Button>
      </footer>
    </div>
  );
};

export default AddBlogs;
