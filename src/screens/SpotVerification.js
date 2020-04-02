import * as React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ActivityIndicator, ScrollView, Dimensions } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { connect } from "react-redux";
import Header from "../components/header/Header";
import { NormalText, ThinText } from "../components/StyledText";
import { createNewSpot } from "../redux/actions/newSpotActions";

const { width } = Dimensions.get("window");
const imgHeight = width / 1.5;

const SpotVerification = props => {
  const { params } = props.route;

  const { navigation, createSpotDis, bannerDis, clearSpotDis } = props;
  const { user, images, title, tags, location } = params.newSpot;
  const [imgs, setImgs] = React.useState([]);
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [address, setAddress] = React.useState({});

  React.useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      // set images
      const realImages = [];
      images.map(rImg => {
        if (rImg.set === true) {
          return realImages.push(rImg.url);
        }
      });
      setImgs(realImages);
      getAddress().then(add => {
        setAddress(add[0]);
      });
    }
    () => (isCanceled = true);
  }, []);

  const getAddress = async () => {
    const latitude = parseFloat(location.latitude);
    const longitude = parseFloat(location.longitude);
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

  const uploadSpot = () => {
    setBtnLoading(true);
    const newSpot = {
      spot: {
        title,
        images: imgs,
        location,
        tags
      },
      user
    };
    createSpotDis(newSpot)
      .then((err, suc) => {
        if (!err) {
          setTimeout(() => {
            bannerDis({
              banner: { msg: "Spot was created", style: "#FFF", show: true }
            });
            navigation.navigate("root", {
              screen: "UserProfile",
              params: { getUploads: true }
            });
            clearSpotDis();
          }, 1000);

          setTimeout(() => {
            setBtnLoading(false);
          }, 1200);
        } else {
          bannerDis({
            banner: {
              msg: "An error has occured",
              style: "#f39c12",
              show: true
            }
          });
          setBtnLoading(false);
        }
        return { err, suc };
      })
      .catch(err => {
        alert("An error has occured");
        return err;
      });
    return null;
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
          {imgs.map((img, i) => (
            <Image key={i} style={s.image} source={{ uri: img }} />
          ))}
        </ScrollView>

        <View style={s.addressCon}>
          <ThinText style={s.infoTxt}>
            {address.city},{address.country}.
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

      <TouchableOpacity
        style={s.submitBtn}
        disabled={btnLoading}
        onPress={() => uploadSpot()}
      >
        <View style={s.buttonContainer}>
          {btnLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <NormalText color="#FFF" size={17}>
              Submit
            </NormalText>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  createSpotDis: payload => dispatch(createNewSpot(payload)),
  bannerDis: payload => dispatch({ type: "SHOW_BANNER", payload }),
  clearSpotDis: payload => dispatch({ type: "NEW_SPOT_RESET" })
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
    width,
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
  map: { width, height: width },
  buttonContainer: {
    width: "100%",
    bottom: 0,
    left: 0,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3498db",
    padding: 20
  }
});
