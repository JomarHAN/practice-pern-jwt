import React, { useEffect, useState } from "react";
import { useStateValue } from "../ContextAPI/StateProvider";
import "./Dashboard.css";
import Upload from "./Upload";

function Dashboard() {
  const [{ isAuth }] = useStateValue();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const getUserName = async () => {
    const response = await fetch("http://localhost:5000/dashboard", {
      method: "GET",
      headers: { token: localStorage.token },
    });
    const parseRes = await response.json();
    if (parseRes.user_name) {
      setUserName(parseRes.user_name);
      setUserId(parseRes.user_id);
      // console.log(parseRes);
    } else {
      localStorage.removeItem("token");
      return true;
    }
  };

  useEffect(() => {
    getUserName();
  }, []);
  return (
    <div className="dashboard">
      {isAuth ? (
        <div className="dashboard__upload">
          <h1>Welcome {userName}</h1>
          <Upload userId={userId} />
        </div>
      ) : (
        <h1>you need to login</h1>
      )}
    </div>
  );
}

export default Dashboard;
