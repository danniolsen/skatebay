import * as React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { Dimensions, ActivityIndicator, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThinText, NormalText } from "../StyledText";
const width = Dimensions.get("window").width;
import { getDistance, convertDistance } from "geolib";
import { storageRef } from "../../utils/firebase";

function Spot(props) {
  const { navigation } = props;
  const [blur, setBlur] = React.useState(0);
  const [mainImage, setMainImage] = React.useState();

  React.useEffect(() => {
    getImages(props.url);
  }, []);

  const getImages = imgUrl => {
    let starsRef = storageRef.child(`/${props.spotId}/${imgUrl}`);
    starsRef.getDownloadURL().then(url => {
      setMainImage(url);
    });
  };

  const distance = location => {
    let dis = getDistance(
      { latitude: props.spotLocation.lat, longitude: props.spotLocation.lon },
      {
        latitude: props.userLocation.latitude,
        longitude: props.userLocation.longitude
      }
    );
    let converted = convertDistance(dis, "km");
    return converted.toFixed(1);
  };

  const hideSpot = () => {
    Alert.alert(
      "Spot removal",
      "Are you sure you want to remove this spot from your list?",
      [
        { text: "Cancel", onPress: () => null },
        { text: "Remove spot", onPress: () => setBlur(70) }
      ],
      { cancelable: false }
    );
  };

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

      <TouchableOpacity onPress={props.enterAction}>
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
        <View style={s.option}>
          <TouchableOpacity onPress={props.saveSpotAction}>
            <Feather name="bookmark" size={25} color={props.color} />
          </TouchableOpacity>
        </View>
        <View style={s.option}>
          <TouchableOpacity onPress={() => hideSpot()}>
            <Feather
              name="eye-off"
              style={{ marginTop: 1 }}
              size={22}
              color="#2f363d"
            />
          </TouchableOpacity>
        </View>
        <View style={s.distance}>
          <ThinText color="#2f363d" size={20}>
            {distance(props.spotLocation)} km
          </ThinText>
        </View>
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
  imageCon: { margin: 4, marginBottom: 0, position: "relative" },
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
    width: width - 16,
    height: width - 100,
    resizeMode: "cover"
  },
  optionsBar: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: "row"
  },
  option: { flex: 1 },
  distance: { flex: 6, alignItems: "flex-end" }
});
