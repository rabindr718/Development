import React, { useState, useCallback, useReducer, useEffect } from "react";
function AddData({ data, setData }) {
  const [formData, setFormData] = useState({ name: "", email: "" });
  // console.log(formData);
  //************************************************** */ TESTING

  // async function name() {
  //   return "A";
  // }

  // name().then((result) => {
  //   console.log(result === "A");
  // });
  // async function nameX() {
  //   return "A";
  // }

  // (async () => {
  //   console.log((await nameX()) === "A"); // true
  // })();
  // console.log(useState);
  // console.log(useCallback);
  // console.log(useReducer);
  // console.log(useEffect);

  // const abc = useState("state");
  // console.log(abc);

  //************************************************** */ FORM HANDLING
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data, { ...formData, id: Date.now() }]);
    setFormData({ name: "", email: "" });
  };
  //************************************************** */ FORM HANDLING

 
  return (
    <div>
      <h2>Add Data</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddData;
