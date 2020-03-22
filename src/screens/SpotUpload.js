import * as React from "react";
import { TouchableOpacity, Alert, Keyboard } from "react-native";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { InputData, ImagePicking } from "../components/uploadSpot";
import { SpotTags, VerifySpot } from "../components/uploadSpot";
import Header from "../components/header/Header";
import { NormalText } from "../components/StyledText";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";

function SpotUpload(props) {
  const { user } = props;
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

  const setImages = images => {
    let newImagesCopy = Object.assign({}, newImages);
    newImagesCopy = images;
    setNewImages(newImagesCopy);

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

  const setTitle = title => {
    let newTitleCopy = Object.assign({}, newTitle);
    newTitleCopy = title;
    setNewTitle(newTitleCopy);
  };

  const setTags = tag => {
    let newTagsCopy = [...newTags];
    setNewTags(tag);
  };

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

  const clearSpot = () => {
    setNewTitle("");
    setNewTags([]);
    setNewLocation({ latitude: null, longitude: null });
    setNewImages([{ set: false, location: {} }]);
  };

  const submitErrors = errors => {
    return errors;
  };

  const spotStatus = status => {
    setBtnActive(status);
  };

  const uploadSpot = status => {
    if (status) {
      console.log("upload now");
    }
  };

  return (
    <View style={s.container}>
      <Header rightIcon="trash" rightAction={() => clearSpotWarn()} />
      <ScrollView style={s.content}>
        <View style={s.imageContainer}>
          <ImagePicking
            headline={{
              name: "+ Add images",
              warning: "min of 1 image is reqired"
            }}
            imageData={images => setImages(images)}
            getImages={newImages}
          />
        </View>

        <View style={s.inputContiner}>
          <InputData
            headline={{
              name: "Spot title",
              warning: "min 3 characters are reqired"
            }}
            title={title => setTitle(title)}
            getTitle={newTitle}
          />
        </View>

        <View style={s.tagsContiner}>
          <SpotTags
            headline={{
              name: "+ add tags",
              warning: "min of 1 tag is reqired"
            }}
            selectTag={tag => setTags(tag)}
            getTags={newTags}
          />
        </View>
      </ScrollView>

      <View style={s.buttonContainer}>
        <VerifySpot
          user={user}
          duplicate={duplicate}
          images={newImages}
          location={newLocation}
          title={newTitle}
          tags={newTags}
          error={errors => submitErrors(errors)}
          spotStatus={status => spotStatus(status)}
          uploadSpot={status => uploadSpot(status)}
          btnStatus={btnActive}
        />
      </View>
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
  container: { flex: 1, position: "relative" },
  content: { flex: 1, marginBottom: 38 },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0
  }
});
