import React from "react";
import "./ImageCom.css";
import { Image } from "cloudinary-react";

function ImageCom({ image }) {
  console.log(image);
  return (
    <div className="imageCom">
      <Image
        cloudName="jomar-cloud"
        publicId={image.image_url}
        width="300"
        crop="scale"
      />
      <h3>{image.image_title}</h3>
    </div>
  );
}

export default ImageCom;
