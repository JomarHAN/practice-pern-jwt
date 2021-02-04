import React, { useEffect, useState } from "react";
import { useStateValue } from "../ContextAPI/StateProvider";

function Dashboard() {
  const [{ isAuth }] = useStateValue();
  const [userName, setUserName] = useState("");
  const getUserName = async () => {
    const response = await fetch("http://localhost:5000/dashboard", {
      method: "GET",
      headers: { token: localStorage.token },
    });
    const parseRes = await response.json();
    setUserName(parseRes.user_name);
  };

  useEffect(() => {
    getUserName();
  }, []);
  return isAuth ? <h1>Welcome {userName}</h1> : <h1>you need to login</h1>;
}

export default Dashboard;
