import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Fragment,
  Alert,
  Share
} from "react-native";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import { getDistance, convertDistance } from "geolib";
import { ThinText } from "../StyledText";
import {
  saveSpot,
  getSavedSpotsList
} from "../../redux/actions/saveSpotActions";

function SpotOptions(props) {
  const { saveSpotDis, savedListDis, user, userLocation, saved } = props;
  const { removeSpotDis } = props;

  const saveSpot = () => {
    const saveData = {
      spot_id: props.spotId,
      user_id: user.user_id
    };
    saveSpotDis(saveData)
      .then(sp => {
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
    props.hideSpot(removeData);
  };

  const isSaved = () => {
    const exists = saved.find(({ spot_id }) => spot_id === props.spotId);
    return exists ? "#27ae60" : Colors.iconColor;
  };

  const shareSpot = async () => {
    try {
      const result = await Share.share({
        message: `SpotDetails ${props.link.spot_id}`
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      }
    } catch (error) {
      alert(error.message);
    }
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
            color={Colors.iconColor}
          />
        </TouchableOpacity>
      </View>
      <View style={s.option}>
        <TouchableOpacity onPress={() => shareSpot()}>
          <Feather
            name="share-2"
            style={{ marginTop: 2 }}
            size={24}
            color={Colors.iconColor}
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
  savedListDis: payload => dispatch(getSavedSpotsList(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotOptions);

const s = StyleSheet.create({
  option: { flex: 1 },
  distance: { flex: 6, alignItems: "flex-end" }
});
