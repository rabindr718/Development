import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import classes from "./blogDetails.module.css";

import Navigation from "../navigation/navbar";
import { useNavigate } from "react-router-dom";

const date = new Date();
console.log(date);
const BlogDetails: React.FC = (props) => {
  const navigate = useNavigate();
  const [blogAvailable, setBlogAvailable] = useState(true);
  const UpdateBlogHandler = () => {};
  const DeleteBlogHandler = () => {};

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
      <div>{blogAvailable && <h3>No Blogs are Available Now !</h3>}</div>

      {blogAvailable && (
        <div className={classes.showPage}>
          <Modal.Title>
            <h5>Show Blog</h5>
            <h1>Blog Title</h1>
          </Modal.Title>

          <p className={classes.date}>Date 12/06/2023</p>

          <p>Here Image is Dispalayed</p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Blanditiis, expedita? Distinctio sint totam perferendis similique,
            iste ea earum unde cumque optio nihil accusantium veniam a molestias
            consequatur in obcaecati magni! Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Blanditiis, expedita? Distinctio sint
            totam perferendis similique, iste ea earum unde cumque optio nihil
            accusantium veniam a molestias consequatur in obcaecati magni! Lorem
            ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis,
            expedita? Distinctio sint totam perferendis similique, iste ea earum
            unde cumque optio nihil accusantium veniam a molestias consequatur
            in obcaecati magni!
          </p>
          <p className={classes.author}>
            <strong>
              <i>Author ~ Rabindra Kr. Sharma</i>
            </strong>
          </p>
          <div className="deleteUpdate justify-content-center">
            <Button variant="danger secondary" onClick={DeleteBlogHandler}>
              Delete
            </Button>{" "}
            <Button variant="success primary" onClick={UpdateBlogHandler}>
              Update
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
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
