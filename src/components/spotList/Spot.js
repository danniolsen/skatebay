import * as React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { ThinText, NormalText } from "../StyledText";
import { storageRef } from "../../utils/firebase";
import SpotOptions from "./SpotOptions";

const { width } = Dimensions.get("window");
const imgHeight = width / 1.5;

function Spot(props) {
  const { navigation } = props;
  const [blur, setBlur] = React.useState(0);
  const [mainImage, setMainImage] = React.useState();

  React.useEffect(() => {
    let isCancled = false;
    if (!isCancled) {
      const starsRef = storageRef.child(`/${props.spotId}/${props.url}`);
      starsRef.getDownloadURL().then(url => {
        setMainImage(url);
      });
    }
    () => (isCancled = true);
  });

  return (
    <View style={s.container}>
      <View style={s.header}>
        <ThinText style={s.headline} size={20}>
          {props.title}
        </ThinText>
        <TouchableOpacity onPress={props.moreAction}>
          <Feather style={s.more} name="more-vertical" size={20} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={props.enterAction} activeOpacity={0.8}>
        <View style={s.imageCon}>
          <View style={s.imageOverlay}>
            <Feather name="image" size={20} color="#2f363d" />
            <NormalText style={s.imgNo} size={15} color="#2f363d">
              {props.imgCount}
            </NormalText>
          </View>
          <Image
            source={{
              uri: mainImage
            }}
            style={s.image}
            blurRadius={blur}
          />
        </View>
      </TouchableOpacity>

      <View style={s.optionsBar}>
        <SpotOptions
          spotId={props.spotId}
          saved={props.saved}
          hideSpot={() => setBlur(70)}
          spotLocation={props.spotLocation}
        />
      </View>
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
