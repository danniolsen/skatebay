import * as React from "react";
import { TouchableOpacity, Alert } from "react-native";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { InputData, ImagePicking } from "../components/uploadSpot";
import { SpotTags, VerifySpotData } from "../components/uploadSpot";
import Header from "../components/header/Header";
import { NormalText } from "../components/StyledText";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";

function SpotUpload(props) {
  const { user, navigation } = props;
  const [keyboardUp, setKeyboardUp] = React.useState(false);
  const scrollViewRef = React.useRef();
  const [newImages, setNewImages] = React.useState([
    { set: false, location: {} }
  ]);
  const [newLocation, setNewLocation] = React.useState({
    latitude: null,
    longitude: null
  });
  const [duplicate, setDuplicate] = React.useState(true);
  const [newTitle, setNewTitle] = React.useState("");
  const [newTags, setNewTags] = React.useState([]);
  const [btnActive, setBtnActive] = React.useState(false);

  // add images to images array
  const setImages = images => {
    let newImagesCopy = Object.assign({}, newImages);
    newImagesCopy = images;
    setNewImages(newImagesCopy);

    // set location from first image
    let newLocationCopy = Object.assign({}, newLocation);
    if (images.length !== 0) {
      newLocationCopy.latitude = images[0].location.latitude;
      newLocationCopy.longitude = images[0].location.longitude;
    } else {
      newLocationCopy.latitude = null;
      newLocationCopy.longitude = null;
    }
    setNewLocation(newLocationCopy);
  };

  // scroll down on jeyboard toggle
  const focusInput = keyboard => {
    if (keyboard) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 500);
    }
  };

  // set spot title to title
  const setTitle = title => {
    let newTitleCopy = Object.assign({}, newTitle);
    newTitleCopy = title;
    setNewTitle(newTitleCopy);
  };

  // add tags to tags array
  const setTags = tag => {
    let newTagsCopy = [...newTags];
    setNewTags(tag);
  };

  // earning before removing spot data
  const clearSpotWarn = () => {
    Alert.alert(
      "Clear spot",
      "Are you sure you want to clear the spot?",
      [
        { text: "Cancel", onPress: () => null },
        { text: "Clear", onPress: () => clearSpot() }
      ],
      { cancelable: false }
    );
  };

  // clear all spot data
  const clearSpot = () => {
    setNewTitle("");
    setNewTags([]);
    setNewLocation({ latitude: null, longitude: null });
    setNewImages([{ set: false, location: {} }]);
  };

  // activate and inactivate button
  const spotStatus = status => {
    setBtnActive(status);
  };

  // verify spot data
  const verifySpot = () => {
    if (btnActive) {
      let spot = {
        user: user,
        images: newImages,
        title: newTitle,
        tags: newTags,
        location: newLocation,
        status: btnActive
      };
      navigation.navigate("SpotVerify", spot);
    }
  };

  return (
    <View style={s.container}>
      <Header rightIcon="trash" rightAction={() => clearSpotWarn()} />

      <ScrollView
        style={s.content}
        ref={scrollViewRef}
        onContentSizeChange={(contentWidth, contentHeight) => {
          focusInput();
        }}
      >
        <View style={s.imageContainer}>
          <ImagePicking
            headline={{
              name: "+ Add images",
              warning: "Minimum 1 image is reqired"
            }}
            imageData={images => setImages(images)}
            getImages={newImages}
          />
        </View>

        <View>
          <InputData
            headline={{
              name: "Spot title",
              warning: "Minimum 3 characters are reqired"
            }}
            title={title => setTitle(title)}
            getTitle={newTitle}
            inputTap={keyboard => focusInput(keyboard)}
          />
        </View>

        <View style={s.tagsContiner}>
          <SpotTags
            headline={{
              name: "+ add tags",
              warning: "Minimum of 1 tag is reqired"
            }}
            selectTag={tag => setTags(tag)}
            getTags={newTags}
          />
        </View>

        <View style={s.buttonContainer}>
          <VerifySpotData
            user={user}
            duplicate={duplicate}
            images={newImages}
            location={newLocation}
            title={newTitle}
            tags={newTags}
            spotStatus={status => spotStatus(status)}
            verifySpot={status => verifySpot(status)}
            btnStatus={btnActive}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(SpotUpload);

const s = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  buttonContainer: {
    width: "100%",
    bottom: 0,
    left: 0
  }
});
