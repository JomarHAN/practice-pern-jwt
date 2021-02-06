import React, { useEffect, useState } from "react";
import { useStateValue } from "../ContextAPI/StateProvider";
import "./Gallery.css";
import ImageCom from "./ImageCom";

function Gallery() {
  const [{ user }] = useStateValue();
  const [images, setImages] = useState([]);

  const getImages = async () => {
    const response = await fetch(`/dashboard/retrieve/${user?.user_id}`, {
      method: "GET",
    });
    const parseRes = await response.json();
    setImages(parseRes.rows);
  };

  useEffect(() => {
    getImages();
  }, []);

  const handleRemove = async (cloud_id) => {
    try {
      const res = await fetch(`/gallery/delete?cloud_id=${cloud_id}`, {
        method: "DELETE",
      });
      setImages(images.filter((image) => image.cloud_id !== cloud_id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="gallery">
      <h1>Gallery here</h1>
      <div className="gallery__container">
        {images?.map((image) => (
          <div className="gallery__item">
            <ImageCom image={image} />
            <div className="gallery__groupBtn">
              <button className="btn btn-primary">Edit</button>
              <button
                className="btn btn-danger"
                onClick={() => handleRemove(image.cloud_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
