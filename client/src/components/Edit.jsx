import React from "react";
import { useStateValue } from "../ContextAPI/StateProvider";
import "./Edit.css";

function Edit() {
  const [{ imageEdit }] = useStateValue();
  console.log(imageEdit);
  return (
    <div className="edit">
      <h1>Edit Page</h1>
    </div>
  );
}

export default Edit;
