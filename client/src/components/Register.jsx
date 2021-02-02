import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../ContextAPI/StateProvider";

function Register() {
  const [{}, dispatch] = useStateValue();

  const onRegister = () => {
    dispatch({
      type: "SET_ISAUTH",
      isAuth: true,
    });
  };
  return (
    <div>
      <h1>Register</h1>
      <Link to="/login">Login</Link>
      <button onClick={onRegister}>Submit</button>
    </div>
  );
}

export default Register;
