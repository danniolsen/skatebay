import * as React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { NormalText } from "../StyledText";

const VerifySpotData = (props) => {
  const {
    user, duplicate, images, location, title, tags, btnStatus
  } = props;

  const checkImages = () => {
    const numOfImgs = [];
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
    const status = location.latitude !== null && location.longitude !== null;
    return !!status;
  };

  const checkTitle = () => {
    if (title.length >= 3 && title.length <= 20) {
      return true;
    }
    return false;
  };

  const checkTags = () => (!!(tags.length >= 1 && tags.length <= 5));

  const validateData = () => {
    const statusArray = [];
    const titleStatus = checkTitle();
    const imagesStatus = checkImages();
    const tagsStatus = checkTags();
    const locationStatus = checkLocation();

    statusArray.push(titleStatus, imagesStatus, tagsStatus, locationStatus);
    const isTrue = (currentStatus) => currentStatus === true;
    const status = !!statusArray.every(isTrue);

    return props.spotStatus(status);
  };

  validateData();

  return (
    <TouchableOpacity
      style={[s.container, { backgroundColor: btnStatus ? "#3498db" : "#AAA" }]}
      onPress={props.verifySpot}
    >
      <NormalText color="#FFF" size={17}>
        Verify
      </NormalText>
    </TouchableOpacity>
  );
};

export default VerifySpotData;

const s = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  submitBtn: {
    justifyContent: "center",
    padding: 10,
    borderRadius: 5
  }
});
