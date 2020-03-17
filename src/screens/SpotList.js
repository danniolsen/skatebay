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
import SpotMoreModal from "../components/modals/SpotMoreModal";
import { reportSpot } from "../redux/actions/reportActions";

function SpotList(props) {
  const { user, location, locationDis, spotList, reportSpotDis } = props;
  const { spotListDis, navigation } = props;
  const [moreActions, setMoreActions] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(true);
  React.useEffect(
    () => {
      let isCancelled = false;
      if (!isCancelled) {
        // check if custom location is in use from params
        props.route.params ? getSpots(location) : getSpotlist();
      }
      return () => (isCancelled = true);
    },
    [getSpotlist, props.route]
  );

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

  const openMoreActions = spot => {
    setSelected(spot);
    setMoreActions(true);
  };

  const reportSpot = report => {
    let reportResponse = reportSpotDis(report);
    reportResponse
      .then(success => {
        // show banner with msg: success.msg
      })
      .catch(err => {
        // show banner with msg: err.msg
      })
      .finally(f => {
        setTimeout(() => {
          setMoreActions(false);
        }, 1000);
      });
  };

  return (
    <View style={s.container}>
      {moreActions && (
        <SpotMoreModal
          visible={moreActions}
          close={() => setMoreActions(false)}
          spot={selected}
          user={user}
          submit={report => reportSpot(report)}
        />
      )}
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
            spotLocation={{ lat: item.latitude, lon: item.longitude }}
            enterAction={() => goToSpot(item)}
            saved={item.saved}
            moreAction={() => openMoreActions(item)}
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
  reportSpotDis: payload => dispatch(reportSpot(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotList);

const s = StyleSheet.create({
  container: { flex: 1 }
});
