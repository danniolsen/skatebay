import * as React from "react";
import { StyleSheet, View, Dimensions, ScrollView, Text } from "react-native";
import Header from "../components/header/Header";
import { connect } from "react-redux";

// new stuff
import { ThinText } from "../components/StyledText";
import Map from "../components/spotDertails/Map";
import SpotDrawer from "../components/spotDertails/SpotDrawer";
import SpotImages from "../components/spotDertails/SpotImages";
import SpotInfo from "../components/spotDertails/SpotInfo";
import LocationService from "../features/LocationService";

const { width, height } = Dimensions.get("window");
// new stuff ends

function SpotDetails(props) {
  const { userlocation } = props;
  let spotDetails = props.route.params;
  const [uLocation, setUlocation] = React.useState(userlocation);

  const newDistance = () => {
    LocationService().then(loc => {
      setUlocation(loc);
    });
  };
  return (
    <View style={s.container}>
      <View style={s.mapContainer}>
        <Map
          spotLatitude={spotDetails.latitude}
          spotLongitude={spotDetails.longitude}
        />
      </View>

      <Header
        leftIcon="chevron-left"
        leftAction={() => props.navigation.goBack()}
      />

      <SpotDrawer
        title={spotDetails.spot_title}
        updateDistance={() => newDistance()}
      >
        <ScrollView style={s.innerScroll}>
          <SpotImages
            spotId={spotDetails.spot_id}
            spotImages={spotDetails.spot_images}
          />

          <View style={s.spotInformations}>
            <SpotInfo spotDetails={spotDetails} userLocation={uLocation} />
          </View>
        </ScrollView>
      </SpotDrawer>
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
  container: { flex: 1, ...StyleSheet.absoluteFillObject },
  mapContainer: { ...StyleSheet.absoluteFillObject },
  innerScroll: { height: "100%" }
});
