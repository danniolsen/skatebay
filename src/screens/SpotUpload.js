import * as React from "react";
import { TouchableOpacity, Alert, ScrollView, StyleSheet } from "react-native";
import { Text, View, Image } from "react-native";

import { connect } from "react-redux";
import {
  InputData,
  ImagePicking,
  SpotTags,
  VerifySpotData
} from "../components/uploadSpot";
import Header from "../components/header/Header";
import { bannerShowAlert } from "../redux/actions/bannerActions";
import { NormalText } from "../components/StyledText";
import { setNewSpotData } from "../redux/actions/newSpotActions";
import AlertBanner from "../components/banner/AlertBanner";

function SpotUpload(props) {
  const { user, navigation, newSpot, setNewSpotDis, clearSpotDis } = props;
  const { bannerAlertDis, alert } = props;

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
    // new redux
    const newSpotCopy = { ...newSpot };
    newSpotCopy.newSpot.images = images;
    // new redux ends

    // set location from first image
    if (images.length !== 0) {
      // new redux
      newSpotCopy.newSpot.location = {
        latitude: images[0].location.value.latitude,
        longitude: images[0].location.value.longitude
      };
      // new redux ends
    }
    setNewSpotDis(newSpotCopy); // new redux
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
    // new redux
    const newSpotCopy = { ...newSpot };
    newSpotCopy.newSpot.title = title;
    setNewSpotDis(newSpotCopy);
    // new redux ends
  };

  // add tags to tags array
  const setTags = tag => {
    const newSpotCopy = { ...newSpot };
    newSpotCopy.newSpot.tags = tag;
    setNewSpotDis(newSpotCopy);
  };

  // earning before removing spot data
  const clearSpotWarn = () => {
    bannerAlertDis({
      banner: {
        title: "Clear spot",
        msg: "Are you sure you want to clear the spot?",
        options: true,
        show: true,
        style: "warn"
      }
    });
  };

  // clear all spot data
  const clearSpot = () => {
    clearSpotDis();
  };

  // activate and inactivate button
  const spotStatus = status => {
    setBtnActive(status);
  };

  // verify spot data
  const verifySpot = () => {
    if (btnActive) {
      const newSpotCopy = { ...newSpot };
      newSpotCopy.newSpot.user = user;
      // status: btnActive
      navigation.navigate("SpotVerify", newSpotCopy);
    }
  };

  return (
    <View style={s.container}>
      <AlertBanner
        style={alert.style}
        title={alert.title}
        msg={alert.msg}
        options={alert.options}
        show={alert.show}
        alertAction={() => clearSpot()}
      />
      <Header
        rightIcon="trash"
        color="#e74c3c"
        rightAction={() => clearSpotWarn()}
      />

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
            getImages={newSpot.newSpot.images}
          />
        </View>

        <View>
          <InputData
            headline={{
              name: "Spot title",
              warning: "Minimum 3 characters are reqired"
            }}
            title={title => setTitle(title)}
            getTitle={newSpot.newSpot.title}
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
            getTags={newSpot.newSpot.tags}
          />
        </View>

        <View style={s.buttonContainer}>
          <VerifySpotData
            user={user}
            duplicate={duplicate}
            images={newSpot.newSpot.images}
            location={newSpot.newSpot.location}
            title={newSpot.newSpot.title}
            tags={newSpot.newSpot.tags}
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
  user: state.user,
  newSpot: state.newSpot,
  alert: state.banner.alert
});

const mapDispatchToProps = dispatch => ({
  setNewSpotDis: payload => dispatch(setNewSpotData(payload)),
  clearSpotDis: payload => dispatch({ type: "NEW_SPOT_RESET" }),
  bannerAlertDis: payload => dispatch(bannerShowAlert(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
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
