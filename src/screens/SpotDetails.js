import * as React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { ThinText } from "../components/StyledText";
import Header from "../components/header/Header";
import { connect } from "react-redux";
import SpotMap from "../components/spotDertails/SpotMap";
import { Feather } from "@expo/vector-icons";

function SpotDetails(props) {
  const { userlocation } = props;
  //let spotDetails = props.route.params;
  let spotDetails = {
    distance: "0.30306628925287166",
    latitude: "39.559",
    longitude: "2.678",
    saved: 64,
    spot_id: 4,
    spot_images: ["flat1.jpg", "flat2.jpg"],
    spot_title: "Flat ground",
    spot_type: "Street"
  };

  return (
    <View style={s.container}>
      <Header
        leftIcon="chevron-down"
        leftAction={() => props.navigation.goBack()}
      />

      <ScrollView style={s.spotContainer}>
        <ThinText>hey</ThinText>
      </ScrollView>

      <View style={s.mapContainer}>
        <SpotMap
          spotLat={spotDetails.latitude}
          spotLon={spotDetails.longitude}
        />
      </View>
    </View>
  );
}

const mapStateToProps = state => ({
  user: state.user.user,
  userlocation: state.location
});

export default connect(
  mapStateToProps,
  null
)(SpotDetails);

const s = StyleSheet.create({
  container: { flex: 1 },
  spotContainer: { flex: 1 },
  mapContainer: { flex: 1 }
});
