import * as React from "react";
import axios from "axios";
import ImageConverter from "../../features/ImageConverter";

const createNewSpot = newSpot => {
  const create = (dispatch, error) => {
    let formData = new FormData();

    newSpot.spot.images.map(img => {
      let imageUri = img; // single url
      let filename = imageUri.split("/").pop(); // name single file
      let match = /\.(\w+)$/.exec(filename); // match single file
      let type = match ? `image/${match[1]}` : `image`; // set single type
      formData.append("file", { uri: imageUri, name: filename, type });
    });

    return axios
      .post("http://192.168.1.76:5000/uploadspot", formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        err.data;
      });
  };
  return create;
};

export { createNewSpot };
