import * as React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const imgWidth = width / 4;
const imgHeight = imgWidth / 1.5;

const Thumbnails = props => {
  const { images } = props;
  const [visibility, setVisibility] = React.useState(true);
  const [thumbs, setThumbs] = React.useState([{}, {}, {}, {}]);

  return (
    <View style={s.container}>
      {images.map((img, i) => {
        return (
          <View key={i} style={s.imageContainer}>
            {img.set && <Image style={s.image} source={{ uri: img.url }} />}
          </View>
        );
      })}
    </View>
  );
};

export default Thumbnails;

const s = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", marginLeft: 0 },
  imageContainer: { width: width / 4, marginTop: 1 },
  image: {
    width: imgWidth,
    height: null,
    aspectRatio: 1.5,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: "#FFF"
  }
});

// make thumbnails
// 4 in a row
// click thumbnail, scroll to index(???)
// only show if images are there
// make images square
