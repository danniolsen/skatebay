import * as React from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { connect } from "react-redux";
import Header from "../components/header/Header";
import { saveCount } from "../redux/actions/saveSpotActions";
import Map from "../components/spotDertails/Map";
import SpotDrawer from "../components/spotDertails/SpotDrawer";
import SpotImages from "../components/spotDertails/SpotImages";
import SpotInfo from "../components/spotDertails/SpotInfo";
import LocationService from "../features/LocationService";
import { getUserById } from "../redux/actions/postedByUserActions";

const { width, height } = Dimensions.get("window");

function SpotDetails(props) {
  const { userlocation, user, getUserDis } = props;
  const spotDetails = props.route.params;
  const [uLocation, setUlocation] = React.useState(userlocation);
  const [count, setCount] = React.useState("...");
  const [uploadUser, setUploadUser] = React.useState({});

  const newDistance = () => {
    LocationService().then(loc => {
      setUlocation(loc);
    });
  };

  React.useEffect(() => {
    let isCancled = false;
    if (!isCancled) {
      getUserDis(spotDetails.spots_user_fk).then(postUser => {
        setUploadUser(postUser);
      });

      saveCount(spotDetails.spot_id).then(c => {
        setCount(c);
      });
    }
    () => (isCancled = true);
  }, []);

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
            uuid={spotDetails.uuid}
            spotImages={spotDetails.spot_images}
          />

          <View style={s.spotInformations}>
            <SpotInfo
              spotDetails={spotDetails}
              userLocation={uLocation}
              saveCount={count}
              uploadOwner={uploadUser}
            />
          </View>
        </ScrollView>
      </SpotDrawer>
    </View>
  );
}

const mapStateToProps = state => ({
  user: state.user.user,
  userlocation: state.location,
  saved: state.saved.spots
});

const mapDispatchToProps = dispatch => ({
  getUserDis: payload => dispatch(getUserById(payload))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotDetails);

const s = StyleSheet.create({
  container: { flex: 1, ...StyleSheet.absoluteFillObject },
  mapContainer: { ...StyleSheet.absoluteFillObject },
  innerScroll: { height: "100%" }
});
