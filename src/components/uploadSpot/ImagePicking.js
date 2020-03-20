import * as React from "react";
import { View, StyleSheet, Image, Dimensions, Alert } from "react-native";
import { TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { NormalText, ThinText } from "../StyledText";
const { width, height } = Dimensions.get("window");
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const imgHeight = width / 1.5;

const ImagePicking = props => {
  const [defaultUrl] = React.useState("https://reactjs.org/logo-og.png");
  const [imageLoading, setImageLoading] = React.useState(true);
  const [images, setImages] = React.useState([{ url: defaultUrl, set: false }]);
  const scrollViewRef = React.useRef();
  const [action, setAction] = React.useState(null);

  React.useEffect(() => {
    setImageLoading(false);
    getPermissionAsync();
  }, []);

  // ask for camera rool permissions
  const getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    return status;
  };

  // launch image picker, set image, check if location is present.
  const pickImage = async img => {
    if (!img.set) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Image,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        exif: true
      });
      if (!result.cancelled) {
        let latitude = result.exif.GPSLatitude;
        let longitude = result.exif.GPSLongitude;

        let location = {
          latitude: result.exif.GPSLatitude,
          longitude: result.exif.GPSLongitude
        };

        if (location.latitude !== undefined) {
          let imgUri = result.uri;
          setImg(imgUri);
        } else {
          Alert.alert(
            "Image location error",
            "Image can not be used due to missing image location"
          );
        }
      }
    }
  };
  // add image to array, send images to parent component
  const setImg = async imgUri => {
    let imagesCopy = Object.assign([images], images);
    let lastImgId = imagesCopy.length - 1;
    imagesCopy[lastImgId].url = imgUri;
    imagesCopy[lastImgId].set = true;
    let nextImage = { url: defaultUrl, set: false };
    images.length !== 4 ? imagesCopy.push(nextImage) : null;

    setAction("add"); // set slide action
    setImages(imagesCopy); // add image to local component array

    props.imageData(images); // send images to parrent component

    /*
    TODO:
    // check locations are close to each other
    */
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
    let imagesCopy = Object.assign([images], images);
    imagesCopy.splice(id, 1);

    let firstImage = { url: defaultUrl, set: false };
    images.length === 1 ? imagesCopy.push(firstImage) : null;
    setImages(imagesCopy);
  };

  return (
    <View style={s.container}>
      <View style={s.headline}>
        <NormalText size={13} color="#2f363d">
          Add images
        </NormalText>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={s.imageContainer}
        pagingEnabled
        snapToStart
        ref={scrollViewRef}
        onContentSizeChange={(contentWidth, contentHeight) => {
          slideImage();
        }}
      >
        {images.map((img, index) => {
          return (
            <ImageCon
              key={index}
              data={img}
              removeImage={() => removeImage(index)}
              pickImage={() => pickImage(img)}
              loading={imageLoading}
              noOfImages={images.length}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const ImageCon = props => {
  const { data, loading, noOfImages } = props;

  let setUri = data.set
    ? { uri: data.url }
    : require("../../assets/images/imagePlaceholder.png");

  return (
    <TouchableOpacity style={s.imageCon} onPress={props.pickImage}>
      {data.set && (
        <TouchableOpacity onPress={props.removeImage} style={s.remove}>
          <Feather name="x" size={27} color="#e74c3c" />
        </TouchableOpacity>
      )}

      <View style={s.imgCon}>
        {loading && (
          <ActivityIndicator style={s.loading} size="large" color="#2f363d" />
        )}
        {!loading && <Image style={s.img} source={setUri} />}
      </View>

      <View style={s.imgOverlay}>
        <NormalText color="#FFF">{`${noOfImages - 1} / 4`}</NormalText>
      </View>
    </TouchableOpacity>
  );
};

export default ImagePicking;

const s = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginTop: 5,
    backgroundColor: "#FFF"
  },
  headline: { paddingHorizontal: 10 },

  imageCon: {
    width: width,
    height: imgHeight,
    position: "relative"
  },
  img: { width: width - 10, height: imgHeight, margin: 5 },
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
