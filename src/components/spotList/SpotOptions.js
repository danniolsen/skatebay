import * as React from "react";
import { View, StyleSheet, TouchableOpacity, Fragment } from "react-native";
import { Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThinText } from "../StyledText";
import { connect } from "react-redux";
import { saveSpot } from "../../redux/actions/saveSpotActions";
import { getSavedSpotsList } from "../../redux/actions/saveSpotActions";
import { getDistance, convertDistance } from "geolib";
import { hideSpot } from "../../redux/actions/hideActions";

function SpotOptions(props) {
  const [btnColored, setButtonColor] = React.useState({
    saved: false,
    color: "#2f363d"
  });
  const { saveSpotDis, savedListDis, user, userLocation, hideSpotDis } = props;
  const { hiddenSpots } = props;

  React.useEffect(() => {
    let saved = props.saved
      ? { saved: true, color: "#27ae60" }
      : { saved: false, color: "#2f363d" };
    let isCancled = false;
    setButtonColor(saved);

    return () => (isCancled = true);
  }, []);

  const saveSpot = () => {
    let saveData = {
      spot_id: props.spotId,
      user_id: user.user_id
    };
    saveSpotDis(saveData).then(sp => {
      if (btnColored.saved) {
        setButtonColor({ saved: false, color: "#2f363d" });
      } else {
        setButtonColor({ saved: true, color: "#27ae60" });
      }
      savedListDis(user);
    });
  };

  const distance = location => {
    let dis = getDistance(
      { latitude: props.spotLocation.lat, longitude: props.spotLocation.lon },
      {
        latitude: props.userLocation.latitude,
        longitude: props.userLocation.longitude
      }
    );
    let converted = convertDistance(dis, "km");
    return converted.toFixed(1);
  };

  const hideSpotWarning = () => {
    Alert.alert(
      "Spot removal",
      "Are you sure you want to remove this spot from your list?",
      [
        { text: "Cancel", onPress: () => console.log("not to day") },
        { text: "Remove spot", onPress: () => hideSpot() }
      ],
      { cancelable: false }
    );
  };

  const hideSpot = () => {
    let hideSpotData = {
      spot: props.spotId,
      hiddenSpotList: hiddenSpots.hidden
    };
    hideSpotDis(hideSpotData);
    props.hideSpot();
  };

  return (
    <React.Fragment>
      <View style={s.option}>
        <TouchableOpacity onPress={() => saveSpot()}>
          <Feather name="bookmark" size={25} color={btnColored.color} />
        </TouchableOpacity>
      </View>
      <View style={s.option}>
        <TouchableOpacity onPress={() => hideSpotWarning()}>
          <Feather
            name="eye-off"
            style={{ marginTop: 1 }}
            size={22}
            color="#2f363d"
          />
        </TouchableOpacity>
      </View>
      <View style={s.distance}>
        <ThinText color="#2f363d" size={20}>
          {distance(props.spotLocation)} km
        </ThinText>
      </View>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  user: state.user.user,
  userLocation: state.location,
  hiddenSpots: state.hiddenSpots
});
const mapDispatchToProps = dispatch => ({
  saveSpotDis: payload => dispatch(saveSpot(payload)),
  savedListDis: payload => dispatch(getSavedSpotsList(payload)),
  hideSpotDis: payload => dispatch(hideSpot(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotOptions);

const s = StyleSheet.create({
  option: { flex: 1 },
  distance: { flex: 6, alignItems: "flex-end" }
});
