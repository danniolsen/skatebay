import * as React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Dimensions, Text, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { storage } from "../../utils/firebase";
import { SliderBox } from "react-native-image-slider-box";

const { width, height } = Dimensions.get("window");
const imgHeight = width / 1.5;

const SpotImages = props => {
  const { spotImages, spotId } = props;
  const [images, setImages] = React.useState([]);
  const [imgLoading, setImgLoading] = React.useState(true);

  React.useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      const storageRef = storage.ref(`${spotId}`);
      getImages(storageRef);
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  const getImages = async storageRef => {
    let imgCopy = [];
    let storage = await storageRef.listAll();

    let addImages = storage.items.map(async imageRef => {
      let img = await imageRef.getDownloadURL();
      imgCopy.push(img);
    });

    Promise.all(addImages).then(() => {
      setImages(imgCopy);
    });
  };

  return (
    <View style={s.container}>
      <SliderBox
        style={s.slider}
        imageLoadingColor="#2f3c41"
        images={images}
        resizeMode="cover"
        dotColor="#000"
        inactiveDotColor="#FFF"
      />
    </View>
  );
};

export default SpotImages;

const s = StyleSheet.create({
  container: { backgroundColor: "#FFF", height: imgHeight },
  image: { flex: 1 },
  slider: { width: width, height: imgHeight }
});
