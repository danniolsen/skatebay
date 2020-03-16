import * as React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import Header from "../components/header/Header";
import { Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { NormalText } from "../components/StyledText";
import { connect } from "react-redux";
import { setNewLocation } from "../redux/actions/locationActions";
import LocationService from "../features/LocationService";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

function ExploreMap(props) {
  const { location, navigation, locationDis } = props;

  const [newLocation, setNewLocation] = React.useState({
    latitude: location.latitude,
    longitude: location.longitude
  });

  const updateLocation = e => {
    let updatedLocation = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude
    };
    setNewLocation(updatedLocation);
  };

  const restoreLocation = () => {
    LocationService()
      .then(currentLocation => {
        setNewLocation(currentLocation);
      })
      .catch(err => {
        alert("Location not available");
      });
  };

  const confirmNewLocation = () => {
    let loc = {
      latitude: newLocation.latitude,
      longitude: newLocation.longitude
    };
    locationDis(loc);
    navigation.navigate("root", {
      screen: "SpotList",
      params: { getSpots: true }
    });
  };

  return (
    <View style={s.container}>
      <MapView
        onLongPress={e => updateLocation(e)}
        showsUserLocation={true}
        style={s.map}
        initialRegion={{
          latitude: newLocation.latitude,
          longitude: newLocation.longitude,
          latitudeDelta: 0.0999,
          longitudeDelta: 0.0999
        }}
      >
        <Marker
          draggable
          coordinate={{
            latitude: newLocation.latitude,
            longitude: newLocation.longitude
          }}
          onDragEnd={e => updateLocation(e)}
        />
      </MapView>

      <View style={s.locationContainer}>
        <LocationContainer
          lat={newLocation.latitude}
          lon={newLocation.longitude}
          restoreLocation={() => restoreLocation()}
          confirmLocation={() => confirmNewLocation()}
        />
      </View>
      <View style={s.infoCon}>
        <NormalText size={13} style={{ flex: 1 }} color="#FFF">
          Press and hold the pin to change it's location, or long press anywhere
          on the map to place the marker
        </NormalText>
      </View>
    </View>
  );
}

const LocationContainer = props => {
  return (
    <>
      <View style={s.locationLeft}>
        <View style={s.locationRow}>
          <NormalText color="#FFF" style={s.locationName}>
            Latitude
          </NormalText>
          <NormalText color="#FFF" style={s.locationValue}>
            {props.lat}
          </NormalText>
        </View>

        <View style={s.locationRow}>
          <NormalText color="#FFF" style={s.locationName}>
            Longitude
          </NormalText>
          <NormalText color="#FFF" style={s.locationValue}>
            {props.lon}
          </NormalText>
        </View>
      </View>

      <View style={s.locationRight}>
        <View style={s.buttonCon}>
          <TouchableOpacity onPress={props.restoreLocation}>
            <Feather name="navigation" size={25} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View style={s.buttonCon}>
          <TouchableOpacity onPress={props.confirmLocation}>
            <Feather name="check" size={25} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const mapStateToProps = state => ({
  location: state.location
});

const mapDispatchToProps = dispatch => ({
  locationDis: payload => dispatch(setNewLocation(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreMap);

const s = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  locationContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    position: "absolute",
    bottom: 100,
    padding: 5,
    paddingLeft: 15,
    borderRadius: 5,
    backgroundColor: "rgba(52, 52, 52, 0.5)"
  },
  locationLeft: { flex: 1.9 },
  locationRight: { flex: 1, flexDirection: "row" },
  buttonCon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 1
  },
  locationRow: { flexDirection: "row", padding: 2 },
  locationName: { flex: 1 },
  locationValue: { flex: 1.9 },
  infoCon: {
    marginHorizontal: 10,
    position: "absolute",
    flexDirection: "row",
    bottom: 50,
    textAlign: "center",
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "rgba(52, 52, 52, 0.5)"
  }
});

ExploreMap.defaultProps = {
  location: { latitude: 0.0, longitude: 0.0 }
};
