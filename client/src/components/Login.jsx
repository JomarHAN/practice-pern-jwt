import React, { useState } from "react";
import { useStateValue } from "../ContextAPI/StateProvider";
import "./Login.css";

function Login() {
  const [{}, dispatch] = useStateValue();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onLogin = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_ISAUTH",
      isAuth: true,
    });
  };
  return (
    <div className="login">
      <h1 className="mt-5">Login</h1>
      <form onSubmit={(e) => onLogin(e)} className="login__form">
        <input
          className="form-control my-3"
          type="email"
          name="Email"
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
        <button className="btn btn-success form-control" onClick={onLogin}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
