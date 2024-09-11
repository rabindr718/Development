import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeData from "./DataSource";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function Edit() {
  let History = useNavigate();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [age, setAge] = useState("");

  var index = EmployeData.map((e) => e.id).indexOf(id);
  let handleSubmit = (e) => {
    e.preventDefault();
    let a = EmployeData[index];
    a.name = name;
    a.age = age;
    console.log(a);

    History("/");
  };

 useEffect(() => {
  const name = localStorage.getItem("Name");
  const age = localStorage.getItem("Age");
  const id = localStorage.getItem("Id");

  console.log("ID from localStorage:", id);

  setName(name);
  setAge(age);
  setId(id);
}, []);


  return (
    <div>
      <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            type="text"
            value={name}
            placeholder="Enter Name"
            required
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            type="text"
            placeholder="Enter Age"
            value={age}
            required
            onChange={(e) => setAge(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button onClick={(e) => handleSubmit(e)} type="submit">
          Update{" "}
        </Button>
      </Form>
    </div>
  );
}

export default Edit;
