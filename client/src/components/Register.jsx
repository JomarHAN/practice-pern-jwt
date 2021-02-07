import React, { useState } from "react";
import "./Register.css";
import { useStateValue } from "../ContextAPI/StateProvider";
import { toast } from "react-toastify";

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

  const onRegister = async (e) => {
    e.preventDefault();
    try {
      const body = { name, email, password };
      const response = await fetch("http://localhost:5000/auth/register", {
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
        toast.success("Registered Successfully!");
      } else {
        toast.error(parseRes);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="register">
      <h1 className="mt-5">Register</h1>
      <form className="register__form" onSubmit={(e) => onRegister(e)}>
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
        <button className="btn btn-success form-control">Submit</button>
      </form>
    </div>
  );
}

export default Register;
