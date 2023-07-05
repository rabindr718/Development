import React, { useState } from "react";
import { Form } from "react-bootstrap";

function YourComponent() {
  const [selected, setSelected] = useState("Email");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const handleSelectChange = (e) => {
    setSelected(e.target.value);
  };

  const handleInputChange = (e) => {
    if (selected === "Email") {
      setEmail(e.target.value);
    } else if (selected === "UserName") {
      setUsername(e.target.value);
    }
  };

  return (
    <Form.Group className="input-group">
      <Form.Select
        className="form-control"
        value={selected}
        onChange={handleSelectChange}
      >
        <option value="Email">Email Id</option>
        <option value="UserName">Username</option>
      </Form.Select>
      <Form.Control
        type={selected === "Email" ? "email" : "text"}
        placeholder={
          selected === "Email" ? "Enter your email" : "Enter your username"
        }
        value={selected === "Email" ? email : username}
        onChange={handleInputChange}
      />
    </Form.Group>
  );
}

export default YourComponent;
