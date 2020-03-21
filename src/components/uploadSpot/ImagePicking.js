import * as React from "react";
import { View, StyleSheet, Image, Dimensions, Alert } from "react-native";
import { TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { NormalText, ThinText } from "../StyledText";
const { width, height } = Dimensions.get("window");
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { CheckImagesLocation } from "../../features/LocationService";
const imgHeight = width / 1.5;

const ImagePicking = props => {
  const { getImages } = props;

  const [imageLoading, setImageLoading] = React.useState(true);
  /*const [images, setImages] = React.useState([
    { url: defaultUrl, set: false, location: {} }
  ]);*/

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

        let imgLocation = {
          latitude: result.exif.GPSLatitude,
          longitude: result.exif.GPSLongitude
        };

        if (imgLocation.latitude !== undefined) {
          let prevLocation = getImages[getImages.length - 2];

          let distanceCheck =
            getImages.length === 1
              ? true
              : CheckImagesLocation(prevLocation, imgLocation);
          if (distanceCheck) {
            let imgUri = result.uri;
            setImg(imgUri, imgLocation);
          } else {
            Alert.alert(
              "Location issue!",
              "the images location does not seam to match in range of previus image"
            );
          }
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
  const setImg = async (imgUri, location) => {
    let imagesCopy = Object.assign([getImages], getImages);
    let lastImgId = imagesCopy.length - 1;
    imagesCopy[lastImgId].url = imgUri;
    imagesCopy[lastImgId].set = true;
    imagesCopy[lastImgId].location = location;
    let nextImage = { url: "", set: false, location: {} };
    getImages.length !== 4 ? imagesCopy.push(nextImage) : null;

    setAction("add"); // set slide action

    //setImages(imagesCopy); // add image to local component array

    props.imageData(imagesCopy); // send images to parrent component
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
    let imagesCopy = Object.assign([getImages], getImages);
    let newPlaceholder = { url: "", set: false, location: {} };
    let placeholderId = imagesCopy[imagesCopy.length - 1];
    if (placeholderId.set !== false) {
      imagesCopy.push(newPlaceholder);
    }
    imagesCopy.splice(id, 1);
    props.imageData(imagesCopy);
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
        {getImages.map((img, index) => {
          return (
            <ImageCon
              key={index}
              data={img}
              removeImage={() => removeImage(index)}
              pickImage={() => pickImage(img)}
              loading={imageLoading}
              noOfImages={getImages.length}
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
    marginVertical: 5,
    paddingBottom: 10,
    backgroundColor: "#FFF"
  },
  headline: { paddingTop: 15, paddingLeft: 10 },
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
