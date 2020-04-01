import * as React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = (props) => {
  const { spotLatitude, spotLongitude } = props;
  const latitude = parseFloat(spotLatitude);
  const longitude = parseFloat(spotLongitude);
  return (
    <View style={s.container}>
      <MapView
        showsUserLocation
        style={s.map}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0099,
          longitudeDelta: 0.0099
        }}
      >
        <Marker
          coordinate={{
            latitude,
            longitude
          }}
        />
      </MapView>
    </View>
  );
};

export default Map;

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  map: { width: "100%", height: "100%" }
});
