import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useStateValue } from "../ContextAPI/StateProvider";
import "./Gallery.css";
import ImageCom from "./ImageCom";

function Gallery() {
  const [{ user }, dispatch] = useStateValue();
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
      const response = await fetch(`/gallery/delete?cloud_id=${cloud_id}`, {
        method: "DELETE",
      });
      const parseRes = await response.json();
      console.log(parseRes);
      setImages(images.filter((image) => image.cloud_id !== cloud_id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const moveToEdit = (image) => {
    dispatch({
      type: "SET_ISGALLERY",
      isGallery: true,
    });
    dispatch({
      type: "SET_IMAGEEDIT",
      imageEdit: image,
    });
  };

  return (
    <div className="gallery">
      <h1>Gallery here</h1>
      <div className="gallery__container">
        {images?.map((image) => (
          <div className="gallery__item">
            <ImageCom image={image} />
            <div className="gallery__groupBtn">
              <Link
                to={`/edit/${image.image_title}`}
                className="btn btn-primary"
                onClick={() => moveToEdit(image)}
              >
                Edit
              </Link>
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
