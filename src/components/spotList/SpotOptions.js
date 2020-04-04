import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Fragment,
  Alert
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import { getDistance, convertDistance } from "geolib";
import { ThinText } from "../StyledText";
import {
  saveSpot,
  getSavedSpotsList
} from "../../redux/actions/saveSpotActions";

import { removeSpot } from "../../redux/actions/removeActions";

function SpotOptions(props) {
  const { saveSpotDis, savedListDis, user, userLocation, saved } = props;
  const { removeSpotDis } = props;

  React.useEffect(() => {
    let isCancled = false;
    if (!isCancled) {
    }
    return () => (isCancled = true);
  }, []);

  const saveSpot = () => {
    const saveData = {
      spot_id: props.spotId,
      user_id: user.user_id
    };
    saveSpotDis(saveData)
      .then(sp => {
        if (saved !== 0) {
          console.log("save now");
          //setButtonColor({ saved: false, color: "#2f363d" });
        } else {
          console.log("un save now");
          //setButtonColor({ saved: true, color: "#27ae60" });
        }
        savedListDis(user);
      })
      .catch(err => {
        alert("could not save");
      });
  };

  const distance = location => {
    const dis = getDistance(
      { latitude: props.spotLocation.lat, longitude: props.spotLocation.lon },
      {
        latitude: props.userLocation.latitude,
        longitude: props.userLocation.longitude
      }
    );
    const converted = convertDistance(dis, "km");
    return converted.toFixed(1);
  };

  const removeSpotWarning = () => {
    Alert.alert(
      "Spot removal",
      "Are you sure you want to remove this spot from your list?",
      [
        { text: "Cancel", onPress: () => null },
        { text: "Remove spot", onPress: () => removeSpot() }
      ],
      { cancelable: false }
    );
  };

  const removeSpot = () => {
    const removeData = {
      spot_id: props.spotId,
      user_id: user.user_id
    };
    removeSpotDis(removeData);
    props.hideSpot();
  };

  const isSaved = () => {
    const exists = saved.find(({ spot_id }) => spot_id === props.spotId);
    return exists ? "#27ae60" : "#2f363d";
  };

  return (
    <>
      <View style={s.option}>
        <TouchableOpacity onPress={() => saveSpot()}>
          <Feather name="bookmark" size={25} color={isSaved()} />
        </TouchableOpacity>
      </View>
      <View style={s.option}>
        <TouchableOpacity onPress={() => removeSpotWarning()}>
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
    </>
  );
}

const mapStateToProps = state => ({
  user: state.user.user,
  userLocation: state.location,
  saved: state.saved.spots
});
const mapDispatchToProps = dispatch => ({
  saveSpotDis: payload => dispatch(saveSpot(payload)),
  savedListDis: payload => dispatch(getSavedSpotsList(payload)),
  removeSpotDis: payload => dispatch(removeSpot(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotOptions);

const s = StyleSheet.create({
  option: { flex: 1 },
  distance: { flex: 6, alignItems: "flex-end" }
});
