import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const LocationService = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    alert("We need you location to show you spots! you fuck tard");
  }

  let location = await Location.getCurrentPositionAsync({});

  let geoLocation = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude
  };
  return geoLocation;
};

export default LocationService;
