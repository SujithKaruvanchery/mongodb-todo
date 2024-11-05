import axios from "axios";
import React, { useState } from "react";

function Login() {
  const [data, setdata] = useState({});

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/user/login", data)
      .then((res) => {
        console.log(res.data)
        alert("Login Successfull");
      })
      .catch((err) => {
        alert("Invalid Cridentials");
      });
  };

  const changeHandler = (event, field) => {
    let tempData = { ...data };
    tempData[field] = event.target.value;
    event.target.value;
    setdata(tempData);
  };
  return (
    <div>
      <h1>LOGIN FORM</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          onChange={(event) => changeHandler(event, "email")}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(event) => changeHandler(event, "password")}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
