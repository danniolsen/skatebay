import * as React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native";
import { ThinText, NormalText } from "../StyledText";
import { getDistance, convertDistance } from "geolib";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Feather } from "@expo/vector-icons";
import timeAgo from "../../features/TimeAgo";
import tags from "../../staticData/tags";

const SpotInfo = props => {
  const { spotDetails, userLocation } = props;
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

      findTags(tags);
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

  const findTags = tags => {
    let addTag = Object.assign([], newTags);
    spotDetails.tags.map(spTag => {
      let getTags = tags.find(tag => tag.id === spTag);
      addTag.push(getTags);
    });
    setNewTags(addTag);
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
      <View style={s.tagsCon}>
        {newTags.map((spotTag, i) => {
          return <Tag key={i} spotTag={spotTag} />;
        })}
      </View>
    </>
  );
};

const Tag = props => {
  return (
    // fix tags missing on fetch
    <View style={s.tag}>
      <NormalText size={15} color="#FFF">
        {props.spotTag.name}
      </NormalText>
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
    backgroundColor: "#7f8c8d"
  }
});
