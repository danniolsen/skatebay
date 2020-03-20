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
  const [newSpot, setNewSpot] = React.useState({
    title: null,
    user: user,
    location: {
      latitude: null,
      longitude: null
    },
    images: [],
    tags: []
  });

  const setImages = e => {
    //console.log(e.location);
  };

  return (
    <View style={s.container}>
      <Header />

      <ScrollView>
        <View style={s.imageContainer}>
          <ImagePicking newSpot={newSpot} imageData={e => setImages(e)} />
        </View>

        <View style={s.inputContiner}>
          <InputData newSpot={newSpot} />
        </View>

        <View style={s.tagsContiner}>
          <SpotTags newSpot={newSpot} />
        </View>

        <View style={s.buttonContainer}>
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
