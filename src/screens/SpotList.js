import * as React from "react";
import { ThinText, NormalText } from "../components/StyledText";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { connect } from "react-redux";
import Header from "../components/header/Header";
import LocationService from "../features/LocationService";
import { setNewLocation } from "../redux/actions/locationActions";

function SpotList(props) {
  const { user, location, locationDis } = props;

  React.useEffect(() => {
    // get and set users location is not already set
    if (location.latitude === null && location.longitude === null) {
      LocationService().then(loc => {
        locationDis(loc);
      });
    }
  }, []);

  return (
    <View style={s.container}>
      <Header rightIcon="sliders" rightAction={() => alert("filtering")} />

      <ThinText>get users location</ThinText>
      <ThinText>load spotlist</ThinText>
      <ThinText>inject ad for every 5 spot</ThinText>
      <ThinText>enter spot to see details</ThinText>
      <NormalText>lat: {location.latitude}</NormalText>
      <NormalText>lon: {location.longitude}</NormalText>
    </View>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  location: state.location
});
const mapDispatchToProps = dispatch => ({
  locationDis: payload => dispatch(setNewLocation(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotList);

const s = StyleSheet.create({
  container: { flex: 1 }
});

/*
console.log(location.latitude);
if (location.latitude === null && location.longitude === null) {
  LocationService().then(loc => {
    locationDis(loc);
  });
} else {
  console.log("using persisted location");
}
*/
