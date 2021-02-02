import React, { useState } from "react";
import "./Register.css";
import { useStateValue } from "../ContextAPI/StateProvider";

function Register() {
  const [{}, dispatch] = useStateValue();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onRegister = () => {
    dispatch({
      type: "SET_ISAUTH",
      isAuth: true,
    });
  };
  return (
    <div className="register">
      <h1 className="mt-5">Register</h1>
      <form className="register__form">
        <input
          className="form-control my-3"
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <input
          className="form-control my-3"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          className="form-control my-3"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success form-control" onClick={onRegister}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
