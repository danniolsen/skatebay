import * as React from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { connect } from "react-redux";
import * as firebase from "firebase";
import Header from "../components/header/Header";
import LocationService from "../features/LocationService";
import { setNewLocation } from "../redux/actions/locationActions";
import Spot from "../components/spotList/Spot";
import EmptySpotList from "../components/spotList/EmptySpotList";
import { getSpotList } from "../redux/actions/spotListActions";
import SpotMoreModal from "../components/modals/SpotMoreModal";
import { reportSpot } from "../redux/actions/reportActions";
import { bannerShow } from "../redux/actions/bannerActions";
import SpotOptions from "../components/spotList/SpotOptions";
import { removeSpot } from "../redux/actions/removeActions";

function SpotList(props) {
  const { user, location, locationDis, spotList, reportSpotDis } = props;
  const { spotListDis, navigation, bannerShowDis, removeSpotDis } = props;
  const [moreActions, setMoreActions] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(true);
  const [hidden, setHidden] = React.useState([]);
  const [mainImage, setMainImage] = React.useState();

  React.useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      // check if custom location is in use from params
      props.route.params ? getSpots(location) : getSpotlist();
    }
    return () => (isCancelled = true);
  }, []);

  const getSpotlist = () => {
    setRefreshing(true);
    LocationService().then(loc => {
      locationDis({ latitude: loc.latitude, longitude: loc.longitude });
      getSpots(loc);
    });
  };

  const getSpots = loc => {
    const spotData = { location: loc, user: user.user };
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
    const reportResponse = reportSpotDis(report);
    reportResponse
      .then(success => {
        bannerShowDis({
          banner: {
            msg: success.msg,
            style: "#FFF",
            show: true
          }
        });
      })
      .catch(err => {
        bannerShowDis({
          banner: {
            msg: "Something went wrong",
            style: "#ffc107",
            show: true
          }
        });
      })
      .finally(f => {
        setTimeout(() => {
          setMoreActions(false);
        }, 1000);
      });
  };

  const hideSpot = spot => {
    let hiddenCopy = Object.assign([], hidden);
    hiddenCopy.push({ hidden: spot.spot_id });
    setHidden(hiddenCopy);
    let removeData = {
      spot_id: spot.spot_id,
      user_id: user.user.user_id,
      spotList: spotList
    };
    removeSpotDis(removeData);
  };
  //console.log("No of spots ", spotList.spotList.length);
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
            spotIsHidden={hidden}
          >
            <SpotOptions
              spotId={item.spot_id}
              saved={item.saved}
              hideSpot={spot => hideSpot(spot)}
              spotLocation={{ lat: item.latitude, lon: item.longitude }}
              link={item}
            />
          </Spot>
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
  reportSpotDis: payload => dispatch(reportSpot(payload)),
  bannerShowDis: payload => dispatch(bannerShow(payload)),
  removeSpotDis: payload => dispatch(removeSpot(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotList);

const s = StyleSheet.create({
  container: { flex: 1 }
});
