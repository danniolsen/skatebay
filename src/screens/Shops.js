"use-strict";
import * as React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { ScrollView, Dimensions, Platform } from "react-native";
import { NormalText } from "../components/StyledText";
import Header from "../components/header/Header";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
const { width } = Dimensions.get("window");

const imgWidth = width / 3;

const Shops = props => {
  const [gallery, setGallery] = React.useState([]);
  React.useEffect(() => {
    console.log(MediaLibrary);
    //getAssets();
  }, []);

  const viewExif = () => {};

  const getAlbum = async () => {
    let album = await MediaLibrary.getAlbumAsync("Camera");
    getAssets(album);
  };

  const getAssets = async album => {
    const images = await MediaLibrary.getAssetsAsync({
      first: 5
      //album: album
    });
    setGallery(images.assets);
  };

  const selectImage = async img => {
    const imageData = await MediaLibrary.getAssetInfoAsync(img);
    console.log("--------------- IMAGE DATA ---------------");
    console.log(imageData);
  };

  return (
    <View style={s.container}>
      <Header />

      <View style={s.galleryCon}>
        {gallery.map((img, i) => {
          return (
            <TouchableOpacity key={i} onPress={() => selectImage(img)}>
              <Image source={{ uri: img.uri }} style={s.image} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Shops;

const s = StyleSheet.create({
  container: { flex: 1 },
  galleryCon: { flexDirection: "row", flexWrap: "wrap", paddingBottom: 20 },
  image: {
    width: imgWidth,
    height: imgWidth,
    borderColor: "#FFF",
    borderWidth: 5,
    resizeMode: "cover",
    backgroundColor: "#CCC"
  }
});
