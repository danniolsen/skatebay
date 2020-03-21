import * as React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { InputData, ImagePicking, SpotTags } from "../components/uploadSpot";
import Header from "../components/header/Header";
import { NormalText } from "../components/StyledText";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";

function SpotUpload(props) {
  const { user } = props;
  const [newImages, setNewImages] = React.useState([]);
  const [newLocation, setNewLocation] = React.useState({
    latitude: null,
    longitude: null
  });
  const [newTitle, setNewTitle] = React.useState("");
  const [newTags, setNewTags] = React.useState([]);
  const [newSpot, setNewSpot] = React.useState({
    title: null,
    location: {
      latitude: null,
      longitude: null
    },
    images: [],
    tags: []
  });

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

  return (
    <View style={s.container}>
      <ScrollView>
        <View style={s.imageContainer}>
          <ImagePicking
            newSpot={newSpot}
            imageData={images => setImages(images)}
          />
        </View>

        <View style={s.inputContiner}>
          <InputData newSpot={newSpot} title={title => setTitle(title)} />
        </View>

        <View style={s.tagsContiner}>
          <SpotTags newSpot={newSpot} selectTag={tag => setTags(tag)} />
        </View>

        <View style={s.buttonContainer}>
          {/*submit component / validate data inorder to activate / deactivate btn*/}
          <NormalText>Submit</NormalText>
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
  imageContainer: { flex: 4.3 },
  inputContiner: { flex: 1.2 },
  tagsContiner: { flex: 3.5 },
  buttonContainer: { flex: 1 }
});

/*
<NormalText>{`lat ${newLocation.latitude}`}</NormalText>
<NormalText>{`lon ${newLocation.longitude}`}</NormalText>
<NormalText>{`img ${newImages.length}`}</NormalText>
<NormalText>{`txt ${newTitle}`}</NormalText>
*/
