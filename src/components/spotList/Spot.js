import * as React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { Image, Dimensions, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThinText, NormalText } from "../StyledText";
import { storageRef } from "../../utils/firebase";
import SpotOptions from "./SpotOptions";
import img from "../../assets/images/imagePlaceholder.png";
const { width } = Dimensions.get("window");
const imgHeight = width / 1.5;
import Colors from "../../constants/Colors";

function Spot(props) {
  const {
    navigation,
    spotIsHidden,
    refreshed,
    spotId,
    title,
    moreAction,
    enterAction,
    imgCount,
    children,
    url
  } = props;
  const [mainImage, setMainImage] = React.useState();
  const [blur, setBlur] = React.useState(0);

  React.useEffect(() => {
    let isCancled = false;
    if (!isCancled) {
      const starsRef = storageRef.child(`/${spotId}/${url}`);
      starsRef.getDownloadURL().then(url => {
        setMainImage(url);
      });
    }
    () => (isCancled = true);
  });

  const isHidden = () => {
    let exists = spotIsHidden.find(({ hidden }) => hidden === spotId);
    return exists ? 70 : 0;
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <ThinText style={s.headline} size={20} color={Colors.default}>
          {title}
        </ThinText>
        <TouchableOpacity onPress={moreAction}>
          <Feather
            style={s.more}
            color={Colors.default}
            name="more-vertical"
            size={20}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={enterAction} activeOpacity={0.8}>
        <View style={s.imageCon}>
          <View style={s.imageOverlay}>
            <Feather name="image" size={20} color={Colors.passive} />
            <NormalText style={s.imgNo} size={15} color={Colors.passive}>
              {imgCount}
            </NormalText>
          </View>
          <Image
            source={{
              uri: mainImage
            }}
            style={s.image}
            blurRadius={isHidden()}
          />
        </View>
      </TouchableOpacity>

      <View style={s.optionsBar}>{children}</View>
    </View>
  );
}

export default Spot;

const s = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 5,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "#FFF"
  },
  header: { flexDirection: "row", padding: 10 },
  headline: { flex: 1 },
  more: { marginTop: 2 },
  imageCon: { position: "relative" },
  imageOverlay: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: "row",
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.7)"
  },
  imgNo: { paddingLeft: 5 },
  image: {
    height: imgHeight - 20,
    resizeMode: "stretch"
  },
  optionsBar: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: "row"
  }
});
