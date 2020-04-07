import * as React from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from "react-native";

import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { NormalText } from "../StyledText";
import Headline from "./Headline";
import Thumbnails from "./Thumbnails";
import Upload from "../../features/Upload";
import Colors from "../../constants/Colors";
const { width, height } = Dimensions.get("window");
const imgHeight = width / 1.5;

const ImagePicking = props => {
  const { getImages, headline } = props;
  const [status, setStatus] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(true);
  const scrollViewRef = React.useRef();
  const [action, setAction] = React.useState(null);

  React.useEffect(() => {
    setImageLoading(false);
    getPermissionAsync();
  }, []);

  // ask for camera rool permissions
  const getPermissionAsync = async () => {
    const { statusPermissions } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    return statusPermissions;
  };

  // launch image picker, set image, check if location is present.
  const pickImage = async img => {
    if (!img.set) {
      const img = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Image,
        allowsEditing: false,
        cropping: true,
        aspect: [15, 10],
        quality: 0.1,
        exif: true
      });
      if (!img.cancelled) {
        const imgLocation = Upload().checkLocation(img);

        if (imgLocation.status) {
          const checkDistance = Upload().checkDistance(getImages, imgLocation);

          if (checkDistance.status) {
            setStatus(false); // if field has been touched (for errors)

            const resizedImage = Upload().resizeImage(img);
            resizedImage
              .then(smallImage => {
                const imgUri = smallImage.uri;
                setImg(imgUri, imgLocation);
              })
              .catch(err => {
                alert("Something went wrong, try again");
              });
          } else {
            Alert.alert(checkDistance.title, checkDistance.value);
          }
        } else {
          Alert.alert(imgLocation.title, imgLocation.value);
        }
      } else {
        getImages.length - 1 === 0 ? setStatus(true) : null;
      }
    }
  };

  const setImg = async (imgUri, location) => {
    // set images and add new template, if less than 4 images
    const addedImage = Upload().addImage(imgUri, getImages, location);
    setAction("add"); // set slide action
    props.imageData(addedImage); // send images to parrent component
  };

  // slide to next image placeholder if image action was ADD
  const slideImage = () => {
    if (action === "add") {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 1500);
    }
  };

  // remove an image from the images array
  const removeImage = async id => {
    setAction("remove");
    // use getImages
    const removedUpdate = Upload().removeImage(getImages, id);
    props.imageData(removedUpdate);
    getImages.length - 1 === 1 ? setStatus(true) : setStatus(false);
  };

  return (
    <View style={s.container}>
      <Headline
        name={headline.name}
        warning={headline.warning}
        active={status}
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        snapToStart
        ref={scrollViewRef}
        onContentSizeChange={(contentWidth, contentHeight) => {
          slideImage();
        }}
      >
        {getImages.map((img, index) => (
          <ImageCon
            key={index}
            data={img}
            removeImage={() => removeImage(index)}
            pickImage={() => pickImage(img)}
            loading={imageLoading}
            noOfImages={getImages.length}
          />
        ))}
      </ScrollView>
      <Thumbnails images={getImages} />
    </View>
  );
};

const ImageCon = props => {
  const { data, loading, noOfImages } = props;

  const setUri = data.set
    ? { uri: data.url }
    : require("../../assets/images/imagePlaceholder.png");

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={s.imageCon}
      onPress={props.pickImage}
    >
      {data.set && (
        <TouchableOpacity onPress={props.removeImage} style={s.remove}>
          <Feather name="x" size={27} color={Colors.error} />
        </TouchableOpacity>
      )}

      <View style={s.imgCon}>
        {loading && (
          <ActivityIndicator
            style={s.loading}
            size="large"
            color={Colors.default}
          />
        )}
        {!loading && <Image style={s.img} source={setUri} />}
      </View>

      <View style={s.imgOverlay}>
        <NormalText color={Colors.white}>{`${noOfImages - 1} / 4`}</NormalText>
      </View>
    </TouchableOpacity>
  );
};

export default ImagePicking;

const s = StyleSheet.create({
  container: {
    marginVertical: 5,
    paddingBottom: 10,
    backgroundColor: "#FFF"
  },
  imageCon: {
    width,
    height: imgHeight,
    position: "relative"
  },
  img: { width, height: imgHeight, marginVertical: 5 },
  loading: { height: imgHeight },
  remove: {
    position: "absolute",
    zIndex: 1,
    top: 15,
    right: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#FFF"
  },
  imgOverlay: {
    position: "absolute",
    bottom: 10,
    right: 15,
    zIndex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    backgroundColor: "rgba(000,000,000, 0.6)"
  }
});
