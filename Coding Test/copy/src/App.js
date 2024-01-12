import CopyLink from "./components/First";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { Route, Routes } from "react-router-dom";
import classes from "./Style/design.module.css";
import { Button } from "react-bootstrap";
function App() {
  const navigate = useNavigate();
  const [file, setfile] = useState("");

  const editor = useRef();
  //Take values in Single Object using useState hool
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plainTex: "",
  });

  //Take input values
  const handleChange = (event) => {
    const { name, value } = event.target || event;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  // Image File Fetch
  const fileHandler = (e) => {
    setfile(URL.createObjectURL(e.target.files[0]));
  };
  // Submit Data and Save into LocalStorage
  const handleSubmit = (event) => {
    event.preventDefault();
    const description = editor.current.value;
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(description, "text/html");
    const plainText = htmlDocument.body.textContent;

    const dataWithDescription = {
      id: Math.floor(Math.random() * 100 + 1),
      ...formData,
      plainTex: plainText,
      file: file,
    };

    const existingFormData = JSON.parse(localStorage.getItem("formData")) || [];
    const updatedFormData = [...existingFormData, dataWithDescription];
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
    //Resest input Fields
    setFormData({
      name: "",
      email: "",
      phone: "",
      description: "",
      file: null,
    });
    navigate("/First");
  };
  //here Return the Components
  return (
    <div>
      <div>
        <h1>RABINDDRA KUMAR SHARMA </h1>
      </div>
      <div className={classes.body}>
        <form>
          <h1>Enter The Value</h1>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <br></br>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <br></br>

          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <br></br>

          <div>
            <label htmlFor="message">Description:</label>
            <div className="text-editor">
              <JoditEditor
                ref={editor}
                value={formData.description}
                id="description"
                name="description"
                onChange={handleChange}
              />
            </div>
          </div>
          <br></br>
          <div>
            <div className="mb-3">
              <label htmlFor="formFileMultiple" className="form-label">
                Upload An Image Here
              </label>
              <input
                name="image"
                className="form-control"
                type="file"
                id="formFileMultiple"
                onChange={fileHandler}
              />
            </div>
          </div>

          <button
            className={classes.button}
            onClick={handleSubmit}
            type="button"
          >
            Submit
          </button>
        </form>
        <Routes>
          <Route path="/" />
          <Route path="/First" formData={formData} element={<CopyLink />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
