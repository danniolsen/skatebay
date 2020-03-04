import * as React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Dimensions, Text } from "react-native";
const width = Dimensions.get("window").width;
import { storageRef } from "../../utils/firebase";

function ProfileSpot(props) {
  let type = props.type;
  let spot = props.spot;

  const [mainImage, setMainImage] = React.useState();

  React.useEffect(() => {
    getImages(props.spot.spot_images[0]);
  }, []);

  const getImages = imgUrl => {
    let starsRef = storageRef.child(`/${props.spot.spot_id}/${imgUrl}`);
    starsRef.getDownloadURL().then(url => {
      setMainImage(url);
    });
  };

  return (
    <TouchableOpacity onPress={props.enterAction} style={s.container}>
      <Image source={{ uri: mainImage }} style={s.img} />
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
