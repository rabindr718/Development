import React, { useState } from "react";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const Login = () => {
    console.log(name);
    console.log(password);
  };
  return (
    <div>
      <label>Username</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      ></input>
      <br></br>
      <label>Username</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      ></input>
      <br></br>
      <button onClick={Login}>LOGIN</button>
    </div>
  );
}

export default Login;
