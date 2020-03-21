import * as React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { NormalText } from "../StyledText";

const SubmitSpot = props => {
  const { user, duplicate, images, location, title, tags, btnStatus } = props;

  const validateData = () => {
    let statusArray = [];
    let titleStatus = checkTitle();
    let imagesStatus = checkImages();
    let tagsStatus = checkTags();
    let locationStatus = checkLocation();

    statusArray.push(titleStatus, imagesStatus, tagsStatus, locationStatus);
    const isTrue = currentStatus => currentStatus === true;
    let status = statusArray.every(isTrue) ? true : false;
    return props.spotStatus(status);
  };

  const checkImages = () => {
    let numOfImgs = [];
    images.map((img, i) => {
      if (img.set) {
        numOfImgs.push(img.set);
      }
    });
    if (numOfImgs.length >= 1 && numOfImgs.length <= 4) {
      return true;
    }
    return false;
  };

  const checkLocation = () => {
    let status = location.latitude !== null && location.longitude !== null;
    return status ? true : false;
  };

  const checkTitle = () => {
    if (title.length >= 3 && title.length <= 20) {
      return true;
    }
    return false;
  };

  const checkTags = () => {
    return tags.length >= 1 && tags.length <= 5 ? true : false;
  };

  /*const checkDuplicate = () => {
    make later when upload works
    return null;
  };*/

  return (
    <TouchableOpacity style={s.container} onPress={() => validateData()}>
      <NormalText color="#FFF" size={20}>
        Submit
      </NormalText>
    </TouchableOpacity>
  );
};

export default SubmitSpot;

const s = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#3498db"
  },
  submitBtn: {
    justifyContent: "center",
    padding: 10,
    borderRadius: 5
  }
});
