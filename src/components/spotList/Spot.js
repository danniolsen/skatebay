import * as React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThinText } from "../StyledText";
const width = Dimensions.get("window").width;

function Spot(props) {
  return (
    <View style={s.container}>
      <View style={s.header}>
        <ThinText style={s.headline} size={20}>
          Spot title
        </ThinText>
        <TouchableOpacity onPress={props.moreAction}>
          <Feather style={s.more} name="more-vertical" size={20} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={props.enterAction}>
        <View style={s.imageCon}>
          <Image // check loading options
            source={{ uri: props.url }}
            style={s.image}
          />
        </View>
      </TouchableOpacity>
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
  imageCon: { margin: 4 },
  image: {
    width: width - 16,
    height: width - 100,
    resizeMode: "cover"
  },
  imageOverlayHeader: {},
  optionsBar: {}
});
