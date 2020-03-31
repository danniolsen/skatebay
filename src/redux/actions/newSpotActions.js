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
  //upload images
  const uploadImages = spot_id => {
    let formData = new FormData();
    formData.append("spot_id", spot_id);

    newSpot.spot.images.map((img, i) => {
      let filename = `skatebay-spot-${i}.jpg`;
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

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
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return err.data;
      });
  };
  //return uploadImages;

  const createspotdata = (dispatch, error) => {
    let spot = newSpot.spot;
    let user = newSpot.user;

    return axios
      .post("http://192.168.1.76:5000/newspot", {
        spot: spot,
        user: user
      })
      .then(res => {
        if (res.data.spot_id && res.data.status) {
          uploadImages(res.data.spot_id);
        }
      })
      .catch(err => {
        return err;
      });
  };

  return createspotdata;
};

export { createNewSpot, setNewSpotData };
