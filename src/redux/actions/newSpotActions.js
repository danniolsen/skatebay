import * as React from "react";
import { Platform } from "react-native";
import axios from "axios";

let stripImages = img => {
  return Platform.OS === "android" ? img : img.replace("file://", "");
};

const createNewSpot = newSpot => {
  let images = [];
  newSpot.spot.images.map(img => {
    images.push(stripImages(img));
  });

  // send data to backend, get answer
  const create = (dispatch, error) => {
    axios
      .post("http://192.168.1.76:5000/uploadspot", {
        spot: newSpot.spot,
        user: newSpot.user
      })
      .then(success => {
        return success;
      })
      .catch(err => {
        return err.stack;
      });
    return null;
  };
  return create;
};

export { createNewSpot };
