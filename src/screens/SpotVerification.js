import * as React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { NormalText, ThinText } from "../components/StyledText";
import Header from "../components/header/Header";
import { SliderBox } from "react-native-image-slider-box";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { Marker } from "react-native-maps";
import { connect } from "react-redux";
import { createNewSpot } from "../redux/actions/newSpotActions";

const { width } = Dimensions.get("window");
const imgHeight = width / 1.5;

const SpotVerification = props => {
  let data = props.route.params;
  const { navigation, createSpotDis } = props;
  const { user, images, title, tags, status, location } = data;
  const [imgs, setImgs] = React.useState([]);
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [addressLoading, setAddressLoading] = React.useState(true);
  const [address, setAddress] = React.useState({});

  React.useEffect(() => {
    let isCanceled = false;
    let realImgs = [];
    images.map(img => {
      img.set ? realImgs.push(img.url) : null;
    });
    setImgs(realImgs);
    getAddress()
      .then(add => {
        setAddress(add[0]);
      })
      .finally(fin => {
        setAddressLoading(false);
      });
    () => (isCanceled = true);
  }, []);

  const getAddress = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    let latitude = parseFloat(location.latitude);
    let longitude = parseFloat(location.longitude);
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

  const uploadSpot = () => {
    setBtnLoading(true);
    const newSpot = {
      spot: {
        title: title,
        images: imgs,
        location: location,
        tags: tags
      },
      user: user
    };
    createSpotDis(newSpot);
    /*.then(success => {
        console.log("navigate to profile");
      })
      .catch(error => {
        console.log("show error banner");
        setBtnLoading(false);
      });*/
  };

  return (
    <View style={s.container}>
      <Header leftIcon="chevron-left" leftAction={() => navigation.goBack()} />
      <ScrollView style={s.content}>
        <View style={s.title}>
          <ThinText color="#2f3c41" size={20}>
            {title}
          </ThinText>
        </View>

        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToStart
          style={s.imageCon}
        >
          {imgs.map((img, i) => {
            return <Image key={i} style={s.image} source={{ uri: img }} />;
          })}
        </ScrollView>

        <View style={s.addressCon}>
          <ThinText style={s.infoTxt}>
            {address.city}, {address.country}.
          </ThinText>
          <ThinText style={s.infoTxt}>{address.street}.</ThinText>
        </View>

        <MapView
          style={s.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
          />
        </MapView>
      </ScrollView>
      <View style={s.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={s.submitBtn}
          onPress={() => uploadSpot()}
        >
          <NormalText color="#FFF" size={17}>
            {btnLoading ? <ActivityIndicator color="#FFF" /> : "Submit"}
          </NormalText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  createSpotDis: payload => dispatch(createNewSpot(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(SpotVerification);

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", position: "relative" },
  content: { flex: 1 },
  title: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: "#FFF",
    borderTopWidth: 0.5,
    borderColor: "#CCC"
  },
  imageCon: {},
  image: {
    width: width,
    height: imgHeight,
    borderWidth: 5,
    borderColor: "#FFF"
  },
  addressCon: {
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: "#CCC",
    paddingBottom: 10
  },
  infoTxt: { marginVertical: 2 },
  map: { width: width, height: width },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3498db",
    padding: 10
  }
});
