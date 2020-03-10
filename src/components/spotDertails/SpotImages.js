import * as React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Dimensions, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { storage } from "../../utils/firebase";
import { SliderBox } from "react-native-image-slider-box";

const { width, height } = Dimensions.get("window");
const imgHeight = width / 1.5;

const SpotImages = props => {
  const { spotImages, spotId } = props;
  const [images, setImages] = React.useState([]);

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

  const getImages = storageRef => {
    setImages([]);

    let imgCopy = Object.assign([], images);
    storageRef
      .listAll()
      .then(result => {
        result.items.forEach(imageRef => {
          imageRef
            .getDownloadURL()
            .then(url => {
              imgCopy.push(url);
              setImages(imgCopy);
            })
            .catch(function(error) {
              alert("display error");
            });
        });
      })
      .catch(err => {
        alert("image error");
      });
  };
  return (
    <View style={s.container}>
      <SliderBox
        style={s.slider}
        imageLoadingColor="#2f3c41"
        images={images}
        resizeMode="contain"
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
