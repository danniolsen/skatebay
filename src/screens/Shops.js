"use-strict";
import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import Header from "../components/header/Header";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

const Shops = props => {
  const [gallery, setGallery] = React.useState([]);
  const [location, setLocation] = React.useState({
    location: { latitude: null, longitude: null }
  });

  React.useEffect(() => {
    getGallery();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      exif: true
    });
    if (!result.cancelled) {
      let location = {
        latitude: result.exif.GPSLatitude,
        longitude: result.exif.GPSLongitude
      };
      setLocation(location);
    }
  };

  const getGallery = async () => {
    const assets = await MediaLibrary.getAssetsAsync({
      first: 50,
      sortBy: MediaLibrary.SortBy.creationTime
    });
    setGallery(assets.assets);
  };

  const pickGalleryImage = async img => {
    const imageData = await MediaLibrary.getAssetInfoAsync(img);
    if (imageData.location) {
      let location = {
        latitude: imageData.location.latitude,
        longitude: imageData.location.longitude
      };
      setLocation(location);
    } else {
      setLocation({ location: { latitude: null, longitude: null } });
      alert("No location data on image");
    }
  };

  return (
    <View style={s.container}>
      <TouchableOpacity onPress={() => pickImage()}>
        <Text style={s.btn}>Click here to pick image</Text>
      </TouchableOpacity>
      <View style={{ marginBottom: 20 }} />
      <Text>Latitude: {location.latitude}</Text>
      <Text>Longitude: {location.longitude}</Text>

      <ScrollView style={s.gallery}>
        {gallery.map((img, i) => {
          return (
            <TouchableOpacity key={i} onPress={() => pickGalleryImage(img)}>
              <Image source={{ uri: img.uri }} style={s.image} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Shops;

const s = StyleSheet.create({
  container: { flex: 1, marginTop: 50 },
  image: { width: 200, height: 200 },
  btn: { backgroundColor: "#2ecc71", width: 200, padding: 10 }
});
