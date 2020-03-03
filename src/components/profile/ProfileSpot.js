import * as React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Dimensions, Text } from "react-native";
const width = Dimensions.get("window").width;

function ProfileSpot(props) {
  let type = props.type;
  let spot = props.spot;
  let testImg = "https://sites.google.com/site/ccrisafi/skatespot02.jpg";
  return (
    <TouchableOpacity onPress={props.enterAction} style={s.container}>
      <Image source={{ uri: testImg }} style={s.img} />
    </TouchableOpacity>
  );
}

export default ProfileSpot;

const s = StyleSheet.create({
  container: {
    width: width / 4,
    width: width / 4,
    alignItems: "center",
    padding: 2
  },
  img: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "cover"
  }
});
