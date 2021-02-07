import { Image } from "cloudinary-react";
import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useStateValue } from "../ContextAPI/StateProvider";
import "./Edit.css";

function Edit() {
  const [{ imageEdit }] = useStateValue();
  const [title, setTitle] = useState(imageEdit?.image_title);
  const [imageFile, setImageFile] = useState("");
  const [preview, setPreview] = useState("");
  const history = useHistory();

  const handleOnChangeImage = (e) => {
    setImageFile(e.target.value);
    const file = e.target.files[0];
    file && handlePreview(file);
  };

  const handlePreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/gallery/update?cloud_id=${imageEdit.cloud_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title,
            image: preview,
          }),
        }
      );
      const parseRes = await response.json();
      if (parseRes.result) {
        toast.success(parseRes.message);
        history.push("/gallery");
      } else {
        toast.error(parseRes.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="edit">
      <h1 className="my-4">Edit Page</h1>
      <div className="edit__groupImg">
        <div className="edit__imgLeft">
          <Image
            cloudName="jomar-cloud"
            publicId={imageEdit.image_url}
            width="400"
            crop="scale"
          />
        </div>
        <div className="edit__imgRight">
          {preview ? (
            <img src={preview} alt="chosen" />
          ) : (
            <h3>No file chosen</h3>
          )}
        </div>
      </div>
      <form className="edit__form" onSubmit={(e) => onSubmitUpdate(e)}>
        <input
          type="text"
          placeholder={imageEdit.image_title}
          className="form-control my-3"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          className="form-control my-3"
          value={imageFile}
          onChange={(e) => handleOnChangeImage(e)}
        />
        <button
          disabled={!preview ? true : false}
          className={`btn btn-${
            !preview ? "secondary" : "success"
          } form-control my-2`}
        >
          Update
        </button>
        <Link to="/gallery" className="btn btn-secondary form-control my-2">
          Cancel
        </Link>
      </form>
    </div>
  );
}

export default Edit;
