import * as React from "react";
import { ThinText, NormalText } from "../components/StyledText";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { connect } from "react-redux";
import Header from "../components/header/Header";
import LocationService from "../features/LocationService";
import { setNewLocation } from "../redux/actions/locationActions";
import Spot from "../components/spotList/Spot";
import EmptySpotList from "../components/spotList/EmptySpotList";
import { getSpotList } from "../redux/actions/spotListActions";
import * as firebase from "firebase";
import { saveSpot } from "../redux/actions/saveSpotActions";

function SpotList(props) {
  const { user, location, locationDis, spotList } = props;
  const { spotListDis, navigation, saveSpotDis } = props;

  const [refreshing, setRefreshing] = React.useState(true);
  React.useEffect(() => {
    getSpotlist();
  }, []);

  const getSpotlist = () => {
    setRefreshing(true);
    LocationService().then(loc => {
      locationDis(loc);
      getSpots(loc);
    });
  };

  const getSpots = loc => {
    let spotData = { location: loc, user: user.user };
    spotListDis(spotData);
    setRefreshing(false);
  };

  const goToSpot = spot => {
    navigation.push("SpotDetails", spot);
  };

  const saveSpot = (spot_id, user_id) => {
    let saveData = {
      spot_id: spot_id,
      user_id: user_id
    };
    saveSpotDis(saveData);
  };

  return (
    <View style={s.container}>
      <Header rightIcon="sliders" rightAction={() => alert("filtering")} />
      <FlatList
        data={spotList.spotList}
        onRefresh={() => getSpotlist()}
        refreshing={refreshing}
        scrollToIndex={2}
        renderItem={({ item }) => (
          <Spot
            title={item.spot_title}
            spotId={item.spot_id}
            userId={user.user.user_id}
            imgCount={item.spot_images.length}
            url={item.spot_images[0]}
            userLocation={location}
            saveSpotAction={() => saveSpot(item.spot_id, user.user.user_id)}
            spotLocation={{ lat: item.latitude, lon: item.longitude }}
            enterAction={() => goToSpot(item)}
            color="#2f363d"
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => <EmptySpotList />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  location: state.location,
  spotList: state.spotList
});
const mapDispatchToProps = dispatch => ({
  locationDis: payload => dispatch(setNewLocation(payload)),
  spotListDis: payload => dispatch(getSpotList(payload)),
  saveSpotDis: payload => dispatch(saveSpot(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotList);

const s = StyleSheet.create({
  container: { flex: 1 }
});
