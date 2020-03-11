import * as React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ThinText } from "../StyledText";
import { getDistance, convertDistance } from "geolib";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const SpotInfo = props => {
  const { spotDetails, userLocation } = props;
  const [addressLoading, setAddressLoading] = React.useState(true);
  const [address, setAddress] = React.useState({
    city: "City not found",
    country: "Country not found",
    street: "Street not found"
  });

  React.useEffect(() => {
    let isCancled = false;
    if (!isCancled) {
      getAddress().then(add => {
        let newAddress = {
          city: add[0].city,
          country: add[0].country,
          street: add[0].street
        };
        setAddress(newAddress);
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
  infoCon: { flex: 6 },
  infoTxt: { marginVertical: 2 },
  distance: { flex: 3, alignItems: "flex-end", justifyContent: "center" }
});

/*
<ThinText>{address.city}</ThinText>
<ThinText>{address.country}</ThinText>
<ThinText>{address.street}</ThinText>
*/
