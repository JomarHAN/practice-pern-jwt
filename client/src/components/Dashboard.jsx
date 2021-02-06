import React, { useEffect } from "react";
import { useStateValue } from "../ContextAPI/StateProvider";
import "./Dashboard.css";
import Upload from "./Upload";

function Dashboard() {
  const [{ isAuth, user }, dispatch] = useStateValue();

  const getUserName = async () => {
    const response = await fetch("http://localhost:5000/dashboard", {
      method: "GET",
      headers: { token: localStorage.token },
    });
    const parseRes = await response.json();
    // console.log(parseRes);
    if (parseRes) {
      dispatch({
        type: "SET_USER",
        user: parseRes,
      });
    } else {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    getUserName();
  }, []);
  return (
    <div className="dashboard">
      {isAuth ? (
        <div className="dashboard__upload">
          <h1>Welcome {user?.user_name}</h1>
          <Upload />
        </div>
      ) : (
        <h1>you need to login</h1>
      )}
    </div>
  );
}

export default Dashboard;
