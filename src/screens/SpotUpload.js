import * as React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import {
  InputData,
  ImagePicking,
  SpotTags,
  SubmitSpot
} from "../components/uploadSpot";
import Header from "../components/header/Header";
import { NormalText } from "../components/StyledText";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";

function SpotUpload(props) {
  console.log(<Header />);
  const { user } = props;
  const [newImages, setNewImages] = React.useState([]);
  const [newLocation, setNewLocation] = React.useState({
    latitude: null,
    longitude: null
  });
  const [duplicate, setDuplicate] = React.useState(true);
  const [newTitle, setNewTitle] = React.useState("");
  const [newTags, setNewTags] = React.useState([]);

  const setImages = images => {
    let newImagesCopy = Object.assign({}, newImages);
    newImagesCopy = images;
    setNewImages(newImagesCopy);

    let newLocationCopy = Object.assign({}, newLocation);
    newLocationCopy.latitude = images[0].location.latitude;
    newLocationCopy.longitude = images[0].location.longitude;
    setNewLocation(newLocationCopy);
  };

  const setTitle = title => {
    let newTitleCopy = Object.assign({}, newTitle);
    newTitleCopy = title;
    setNewTitle(newTitleCopy);
  };

  const setTags = tag => {
    let newTagsCopy = Object.assign([], newTags);
    newTagsCopy.push(tag);
    setNewTags(newTagsCopy);
  };

  const submitErrors = errors => {
    return errors;
  };
  return (
    <View style={s.container}>
      <Header />
      <ScrollView style={s.content}>
        <View style={s.imageContainer}>
          <ImagePicking imageData={images => setImages(images)} />
        </View>

        <View style={s.inputContiner}>
          <InputData title={title => setTitle(title)} />
        </View>

        <View style={s.tagsContiner}>
          <SpotTags selectTag={tag => setTags(tag)} />
        </View>
      </ScrollView>

      <View style={s.buttonContainer}>
        <SubmitSpot
          user={user}
          duplicate={duplicate}
          images={newImages}
          location={newLocation}
          title={newTitle}
          tags={newTags}
          error={errors => submitErrors(errors)}
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
  imageContainer: { flex: 4.3 },
  inputContiner: { flex: 1.2 },
  tagsContiner: { flex: 3.5 },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0
  }
});

/*
<NormalText>{`lat ${newLocation.latitude}`}</NormalText>
<NormalText>{`lon ${newLocation.longitude}`}</NormalText>
<NormalText>{`img ${newImages.length}`}</NormalText>
<NormalText>{`txt ${newTitle}`}</NormalText>
*/
