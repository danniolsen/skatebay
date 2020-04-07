import * as React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  ActivityIndicator
} from "react-native";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import { storage } from "../../utils/firebase";

const { width, height } = Dimensions.get("window");
const imgHeight = width / 1.5;

const SpotImages = props => {
  const { spotImages, spotId } = props;
  const [images, setImages] = React.useState([]);
  const [imgLoading, setImgLoading] = React.useState(true);

  React.useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      console.log(spotId);
      const storageRef = storage.ref(`${spotId}`);
      getImages(storageRef);
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  const getImages = async storageRef => {
    const imgCopy = [];
    const storage = await storageRef.listAll();

    const addImages = storage.items.map(async imageRef => {
      const img = await imageRef.getDownloadURL();
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
        imageLoadingColor={Colors.passive}
        images={images}
        resizeMode="cover"
        dotColor={Colors.passive}
        inactiveDotColor={Colors.white}
      />
    </View>
  );
};

export default SpotImages;

const s = StyleSheet.create({
  container: { backgroundColor: "#FFF", height: imgHeight },
  image: { flex: 1 },
  slider: { width, height: imgHeight }
});
