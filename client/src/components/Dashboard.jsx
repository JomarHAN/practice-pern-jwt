import React from "react";
import { useStateValue } from "../ContextAPI/StateProvider";

function Dashboard() {
  const [{ isAuth }] = useStateValue();
  return isAuth ? <h1>Dashboard here</h1> : <h1>you need to login</h1>;
}

export default Dashboard;
