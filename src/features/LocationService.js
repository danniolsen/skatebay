import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const LocationService = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    return alert(
      "Location service is required in order to display the skatespots"
    );
  }

  let location = await Location.getCurrentPositionAsync({});
  let geoLocation = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude
  };
  return geoLocation;
};

export default LocationService;
