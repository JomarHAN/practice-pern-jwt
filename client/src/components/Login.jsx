import React, { useState } from "react";
import { toast } from "react-toastify";
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

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        dispatch({
          type: "SET_ISAUTH",
          isAuth: true,
        });
        toast.success("Loggin successfully!");
      } else {
        toast.error(parseRes.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="login">
      <h1 className="mt-5">Login</h1>
      <form onSubmit={(e) => onLogin(e)} className="login__form">
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
        <button className="btn btn-success form-control">Submit</button>
      </form>
    </div>
  );
}

export default Login;
