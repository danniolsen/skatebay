import * as React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ThinText } from "../StyledText";
import { getDistance, convertDistance } from "geolib";

const SpotInfo = props => {
  const { spotDetails, userLocation } = props;
  const [btnColored, setButtonColor] = React.useState({
    saved: false,
    color: "#2f363d"
  });

  const distance = location => {
    let dis = getDistance(
      {
        latitude: spotDetails.latitude,
        longitude: spotDetails.longitude
      },
      {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude
      }
    );
    let converted = convertDistance(dis, "km");
    return converted.toFixed(1);
  };

  return (
    <View style={s.container}>
      <View style={s.spotTypes}>
        {["Street", "Skatepark", "curbs", "rails"].map((type, i) => {
          return (
            <View key={i} style={s.spotTypeCon}>
              <ThinText size={20} color="#2f363d">
                {type}
              </ThinText>
            </View>
          );
        })}
      </View>
      <View style={s.distance}>
        <ThinText color="#2f363d" size={20}>
          {distance()} km
        </ThinText>
      </View>
    </View>
  );
};

export default SpotInfo;

const s = StyleSheet.create({
  container: { padding: 10, paddingRight: 10, flexDirection: "row" },
  spotTypes: { flex: 6, flexDirection: "row", flexWrap: "wrap" },
  spotTypeCon: {
    marginRight: 7,
    marginBottom: 7,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 7,
    borderWidth: 0.4,
    borderColor: "#2f363d"
  },
  distance: { flex: 1.6, paddingTop: 4, alignItems: "flex-end" }
});
