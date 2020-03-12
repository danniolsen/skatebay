import * as React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { ThinText } from "../StyledText";
import { getDistance, convertDistance } from "geolib";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Feather } from "@expo/vector-icons";
import timeAgo from "../../features/TimeAgo";

const SpotInfo = props => {
  const { spotDetails, userLocation } = props;
  const [addressLoading, setAddressLoading] = React.useState(true);
  const [timeSince, setTimeSince] = React.useState("...");
  const [address, setAddress] = React.useState({
    city: null,
    country: null,
    street: null,
    error: null
  });

  React.useEffect(() => {
    let isCancled = false;
    if (!isCancled) {
      let date = timeAgo(spotDetails.spot_created_at);
      setTimeSince(date);
      getAddress()
        .then(add => {
          let newAddress = {
            city: add[0].city,
            country: add[0].country,
            street: add[0].street
          };
          setAddress(newAddress);
        })
        .catch(err => {
          let errorAddress = {
            ...address,
            error: "Not able to get address informations"
          };
          setAddress(errorAddress);
        });
    }
    () => (isCancled = true);
  }, []);

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

  const getAddress = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    let latitude = parseFloat(spotDetails.latitude);
    let longitude = parseFloat(spotDetails.longitude);
    try {
      let addressLookup = Location.reverseGeocodeAsync({
        latitude: latitude,
        longitude: longitude
      });
      return addressLookup;
    } catch (err) {
      return err.stack;
    }
  };
  return (
    <>
      <View style={s.container}>
        <View style={s.infoCon}>
          <ThinText style={s.infoTxt}>
            {address.city}, {address.country}.
          </ThinText>
          <ThinText style={s.infoTxt}>{address.street}.</ThinText>
        </View>
        <View style={s.distance}>
          <ThinText size={20}>{distance()} km</ThinText>
        </View>
      </View>

      <View style={s.timeCon}>
        <Feather name="clock" size={13} color="#AAA" />
        <ThinText color="#2f3c41" size={13} style={s.time}>
          {timeSince}
        </ThinText>
      </View>
    </>
  );
};

const Tags = props => {
  return (
    <View style={s.tagsCon}>
      <ThinText>tag one</ThinText>
      <ThinText>tag one</ThinText>
    </View>
  );
};

export default SpotInfo;

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderBottomColor: "#BBB",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  tagsCon: { padding: 10, backgroundColor: "#CCC" },
  infoCon: { flex: 6 },
  infoTxt: { marginVertical: 2 },
  distance: { flex: 3, alignItems: "flex-end", justifyContent: "center" },
  timeCon: { padding: 10, flexDirection: "row" },
  time: { paddingLeft: 10, marginTop: -1.5 }
});
