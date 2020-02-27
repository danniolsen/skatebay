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

function SpotList(props) {
  const { user, location, locationDis, spotList } = props;
  const { spotListDis } = props;

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
    let spotData = {
      latitude: loc.latitude,
      longitude: loc.longitude,
      idToken: "0"
    };
    spotListDis(spotData);
    setRefreshing(false);
  };

  return (
    <View style={s.container}>
      <Header rightIcon="sliders" rightAction={() => alert("filtering")} />
      <FlatList
        data={spotList.spotList}
        onRefresh={() => getSpotlist()}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <Spot
            title={item.spot_title}
            imgCount={item.img_count}
            url={item.spot_images[0].img_url}
          />
        )}
        keyExtractor={item => item.spot_id.toString()}
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
  spotListDis: payload => dispatch(getSpotList(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotList);

const s = StyleSheet.create({
  container: { flex: 1 }
});
//const spots = [];

const spots = [];
