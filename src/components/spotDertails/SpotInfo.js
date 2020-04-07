import * as React from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { getDistance, convertDistance } from "geolib";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Feather } from "@expo/vector-icons";
import { ThinText, NormalText } from "../StyledText";
import timeAgo from "../../features/TimeAgo";
import Colors from "../../constants/Colors";

const SpotInfo = props => {
  const { spotDetails, userLocation, uploadOwner } = props;
  const [newTags, setNewTags] = React.useState([]);
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
      const date = timeAgo(spotDetails.spot_created_at);
      setTimeSince(date);
      getAddress()
        .then(add => {
          const newAddress = {
            city: add[0].city,
            country: add[0].country,
            street: add[0].street
          };
          setAddress(newAddress);
        })
        .catch(err => {
          const errorAddress = {
            ...address,
            error: "Not able to get address informations"
          };
          setAddress(errorAddress);
        });

      setNewTags(spotDetails.tags);
    }
    () => (isCancled = true);
  }, []);

  const distance = location => {
    const dis = getDistance(
      {
        latitude: spotDetails.latitude,
        longitude: spotDetails.longitude
      },
      {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude
      }
    );
    const converted = convertDistance(dis, "km");
    return converted.toFixed(1);
  };

  const getAddress = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    const latitude = parseFloat(spotDetails.latitude);
    const longitude = parseFloat(spotDetails.longitude);
    try {
      const addressLookup = Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
      return addressLookup;
    } catch (err) {
      return null;
    }
  };

  return (
    <View style={s.container}>
      <View style={s.userInformations}>
        <View style={s.userImage}>
          <Image
            source={{ uri: uploadOwner.photo }}
            style={s.userProfileImage}
          />
        </View>
        <View style={s.userName}>
          <ThinText color={Colors.default}>{uploadOwner.displayname}</ThinText>
        </View>
      </View>
      <View style={s.topContainer}>
        <View>
          <ThinText color={Colors.default} style={s.infoTxt}>
            {address.city},{` ${address.country}`}.
          </ThinText>
          <ThinText color={Colors.default} style={s.infoTxt}>
            {address.street}.
          </ThinText>
        </View>
        <View style={s.distance}>
          <ThinText color={Colors.default} size={20}>
            {distance()} km
          </ThinText>
        </View>
      </View>

      <View style={s.additionalCon}>
        <View style={s.savedCon}>
          <Feather name="bookmark" color={Colors.passive} size={25} />
          <ThinText
            color={Colors.default}
            style={{ marginTop: 5, paddingLeft: 5 }}
          >
            {props.saveCount}
          </ThinText>
        </View>

        <View style={{ flex: 1, alignItems: "flex-end", marginTop: 3 }}>
          <View style={s.timeCon}>
            <Feather name="clock" size={13} color={Colors.passive} />
            <ThinText color={Colors.default} size={13} style={s.time}>
              {timeSince}
            </ThinText>
          </View>
        </View>
      </View>

      <View style={s.tagsHead}>
        <NormalText color={Colors.passive} size={12}>
          Tags
        </NormalText>
      </View>
      <View style={s.tagsCon}>
        {newTags.map((spotTag, i) => (
          <Tag key={i} spotTag={spotTag} />
        ))}
      </View>
    </View>
  );
};

const Tag = props => {
  const { spotTag } = props;
  return (
    // fix tags missing on fetch
    <View style={s.tag}>
      <NormalText size={15} color={Colors.white}>
        {props.spotTag.name}
      </NormalText>
    </View>
  );
};

export default SpotInfo;

const s = StyleSheet.create({
  container: { flex: 1, paddingBottom: 30 },
  topContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 5,
    borderBottomColor: "#BBB",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  infoTxt: { marginVertical: 2 },
  distance: { flex: 3, alignItems: "flex-end", justifyContent: "center" },
  additionalCon: { flexDirection: "row", padding: 10 },
  timeCon: { flex: 1, flexDirection: "row", marginTop: 4 },
  time: { paddingLeft: 10, marginTop: -1.5 },
  savedCon: { flex: 1, flexDirection: "row", marginTop: -1 },
  userInformations: { padding: 10, flexDirection: "row" },
  userImage: { flex: 1.5 },
  userProfileImage: { width: 35, height: 35, borderRadius: 17.5 },
  userName: { flex: 8.5, justifyContent: "center" },
  tagsHead: { paddingLeft: 10, paddingTop: 10 },
  tagsCon: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 10,
    flexWrap: "wrap",
    justifyContent: "center"
  },
  tag: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginRight: 10,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: Colors.passive
  }
});
