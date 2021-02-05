import React, { useEffect, useState } from "react";
import { useStateValue } from "../ContextAPI/StateProvider";
import "./Dashboard.css";

function Dashboard() {
  const [{ isAuth }] = useStateValue();
  const [userName, setUserName] = useState("");
  const getUserName = async () => {
    const response = await fetch("http://localhost:5000/dashboard", {
      method: "GET",
      headers: { token: localStorage.token },
    });
    const parseRes = await response.json();
    console.log(parseRes);
    if (parseRes.user_name) {
      setUserName(parseRes.user_name);
    } else {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    getUserName();
  }, []);
  return (
    <div className="dashboard">
      {isAuth ? <h1>Welcome {userName}</h1> : <h1>you need to login</h1>}
    </div>
  );
}

export default Dashboard;
