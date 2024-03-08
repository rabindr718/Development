import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import classes from "./blogDetails.module.css";
import DatePicker from "./datePicker";

const date = new Date();
console.log(date);
const BlogDetails: React.FC = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [lgShow, setLgShow] = useState(false);

  return (
    <div>
      <Navbar bg="primary" variant="bg">
        <Nav className="me-auto">
          <Button variant="primary">Home</Button>

          <Button variant="primary" onClick={handleShow}>
            Login
          </Button>
        </Nav>
      </Navbar>

      <body className={classes.showPage}>
        <Modal.Title>
          <h5>Show Blog</h5>
          <h1>Blog Title</h1>
        </Modal.Title>

        <p className={classes.date}>
          Date : 28/04/2023
        </p>

        <p>Here Image is Dispalayed</p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis,
          expedita? Distinctio sint totam perferendis similique, iste ea earum
          unde cumque optio nihil accusantium veniam a molestias consequatur in
          obcaecati magni! Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Blanditiis, expedita? Distinctio sint totam perferendis
          similique, iste ea earum unde cumque optio nihil accusantium veniam a
          molestias consequatur in obcaecati magni! Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Blanditiis, expedita? Distinctio sint
          totam perferendis similique, iste ea earum unde cumque optio nihil
          accusantium veniam a molestias consequatur in obcaecati magni!
        </p>
        <p className={classes.author}>
          <strong>
            <i>Author ~ Sunita Kumari</i>
          </strong>
        </p>
        <div className="deleteUpdate justify-content-center">
          <Button variant="danger secondary" onClick={handleClose}>
            Delete
          </Button>{" "}
          <Button variant="success primary" onClick={handleClose}>
            Update
          </Button>
        </div>
        <footer>
          <div className="justify-content-center">
            <Button variant="info primary" onClick={handleClose}>
              Previous
            </Button>{" "}
            <Button variant="info primary" onClick={handleClose}>
              Next
            </Button>
          </div>
        </footer>
      </body>
    </div>
  );
};

export default BlogDetails;
