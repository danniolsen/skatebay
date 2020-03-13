import * as React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native";
import { ThinText, NormalText } from "../StyledText";
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
      return null;
    }
  };
  return (
    <>
      <View style={s.container}>
        <View>
          <ThinText style={s.infoTxt}>
            {address.city}, {address.country}.
          </ThinText>
          <ThinText style={s.infoTxt}>{address.street}.</ThinText>
        </View>
        <View style={s.distance}>
          <ThinText size={20}>{distance()} km</ThinText>
        </View>
      </View>

      <View style={s.additionalCon}>
        <View style={s.savedCon}>
          <Feather name="bookmark" color="#AAA" size={20} />
          <ThinText style={{ marginTop: 3, paddingLeft: 5 }}>
            {props.saveCount}
          </ThinText>
        </View>

        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <View style={s.timeCon}>
            <Feather name="clock" size={13} color="#AAA" />
            <ThinText color="#2f3c41" size={13} style={s.time}>
              {timeSince}
            </ThinText>
          </View>
        </View>
      </View>

      <View style={s.tagsHead}>
        <NormalText color="#AAA" size={12}>
          Tags
        </NormalText>
      </View>
      <ScrollView
        style={s.tagsCon}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <Tags tagName={spotDetails.spot_type} />
      </ScrollView>
    </>
  );
};

const Tags = props => {
  return (
    <View style={s.tagsCon}>
      <ThinText style={s.tag} size={15} color="#2f3c41">
        {props.tagName}
      </ThinText>
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
  infoTxt: { marginVertical: 2 },
  distance: { flex: 3, alignItems: "flex-end", justifyContent: "center" },
  additionalCon: { flexDirection: "row", padding: 10 },
  timeCon: { flex: 1, flexDirection: "row", marginTop: 4 },
  time: { paddingLeft: 10, marginTop: -1.5 },
  savedCon: { flex: 1, flexDirection: "row", marginTop: -1 },
  tagsHead: { paddingLeft: 10, paddingTop: 10 },
  tagsCon: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 5,
    paddingBottom: 5
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#AAA",
    marginRight: 5
  }
});
