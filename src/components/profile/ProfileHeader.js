import React from "react";
import {
  StyleSheet, ImageBackground, View, Image,
  Dimensions
} from "react-native";


const { width } = Dimensions.get("window");
function ProfileHeader(props) {
  const { user } = props;
  const type = user.provider != "google.com" ? "?type=large" : "?sz=180";
  return (
    <ImageBackground
      blurRadius={4}
      style={s.profileCon}
      resizeMode="cover"
      source={{ uri: `${user.photo}${type}` }}
    >
      <View style={s.overlay}>
        <Image
          style={s.profileImage}
          source={{ uri: `${user.photo}${type}` }}
        />
        <View style={s.optionsCon}>{props.children}</View>
      </View>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  profileCon: { flex: 1, width, marginBottom: 2 },
  overlay: {
    backgroundColor: "rgba(105,105,105,0.6)",
    paddingTop: 15,
    paddingBottom: 5,
    alignItems: "center"
  },
  profileImage: {
    width: 120,
    height: 120,
    borderColor: "#FFF",
    borderWidth: 5,
    borderRadius: 75
  },
  optionsCon: {
    flexDirection: "row"
  }
});

export default ProfileHeader;
