import * as React from "react";
import axios from "axios";
import ImageConverter from "../../features/ImageConverter";
import { setNewSpot, resetNewSpot } from "../types/newSpotTypes";

const setNewSpotData = newSpot => {
  const setSpotData = (dispatch, error) => {
    dispatch(setNewSpot(newSpot));
  };
  return setSpotData;
};

const createNewSpot = newSpot => {
  // upload images

  const uploadImages = spot => {
    const formData = new FormData();
    formData.append("spot_id", spot.spot_id);
    formData.append("uuid", spot.uuid);

    newSpot.spot.images.map((img, i) => {
      const filename = spot.images[i];
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image";

      formData.append("spotimage", {
        uri: img,
        name: filename,
        type
      });
    });

    return axios
      .post("http://192.168.1.76:5000/uploadSpotImages", formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      })
      .then(res => res.data)
      .catch(err => err.data);
  };
  // return uploadImages;

  const createspotdata = (dispatch, error) => {
    const { spot, user } = newSpot;

    return axios
      .post("http://192.168.1.76:5000/newspot", {
        spot,
        user
      })
      .then(res => {
        if (res.data.spot_id && res.data.status) {
          uploadImages(res.data);
        }
      })
      .catch(err => true);
  };

  return createspotdata;
};

export { createNewSpot, setNewSpotData };
