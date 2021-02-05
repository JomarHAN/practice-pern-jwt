import React, { useState } from "react";
import "./Upload.css";

function Upload({ userId }) {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [preview, setPreview] = useState("");

  const onImageChange = (e) => {
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

  const onSubmitFile = (e) => {
    e.preventDefault();
    if (!preview) {
      return true;
    }
    handleUpload(preview);
  };

  const handleUpload = async (base64encode) => {
    try {
      const response = await fetch("/dashboard/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          user: userId,
          image: base64encode,
        }),
      });
      const parseRes = await response.json();
      console.log(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="upload">
      <h3>Upload a new image here</h3>
      <form className="upload__form" onSubmit={(e) => onSubmitFile(e)}>
        <input
          type="text"
          name="title"
          className="form-control my-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          name="imageFile"
          className="form-control my-3"
          value={imageFile}
          onChange={(e) => onImageChange(e)}
        />
        <button className="btn btn-success form-control">Upload</button>
      </form>
      {preview && (
        <img
          src={preview}
          alt="chosen"
          style={{ width: 300, margin: 20, borderRadius: 5 }}
        />
      )}
    </div>
  );
}

export default Upload;
