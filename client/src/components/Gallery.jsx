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

  return (
    <div className="gallery">
      <h1>Gallery here</h1>
      <div className="gallery__container">
        {images?.map((image) => (
          <ImageCom image={image} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
