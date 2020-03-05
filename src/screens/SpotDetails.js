import * as React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { ThinText } from "../components/StyledText";
import Header from "../components/header/Header";
import { connect } from "react-redux";
import SpotMap from "../components/spotDertails/SpotMap";
import { Feather } from "@expo/vector-icons";
import SpotImages from "../components/spotDertails/SpotImages";

function SpotDetails(props) {
  const { userlocation } = props;
  let spotDetails = props.route.params;

  return (
    <View style={s.container}>
      <Header
        leftIcon="chevron-left"
        leftAction={() => props.navigation.goBack()}
      />

      <View style={s.spotContainer}>
        <View style={s.spotHeadCon}>
          <View style={s.spotTitle}>
            <ThinText size={20}>{spotDetails.spot_title}</ThinText>
          </View>
          <View style={s.spotMore}>
            <TouchableOpacity onPress={() => alert("more")}>
              <Feather name="more-vertical" size={20} color="#2f3c41" />
            </TouchableOpacity>
          </View>
        </View>
        <SpotImages
          spotId={spotDetails.spot_id}
          spotImages={spotDetails.spot_images}
        />
      </View>

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
  spotContainer: {
    flex: 1,
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: "#FFF"
  },
  spotHeadCon: {
    padding: 10,
    flexDirection: "row"
  },
  spotTitle: { flex: 3 },
  spotMore: { flex: 1, alignItems: "flex-end", marginTop: 2 },
  mapContainer: { flex: 0.1 }
});
