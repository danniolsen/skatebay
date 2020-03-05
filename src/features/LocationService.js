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

  let location = Location.getCurrentPositionAsync({});
  return location
    .then(loc => {
      let geoLocation = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude
      };
      return geoLocation;
    })
    .catch(err => {
      alert(
        "Location service is required inorder to show spots based on your location"
      );
      let geoLocation = {
        latitude: "0.000000",
        longitude: "00.00000"
      };
      return geoLocation;
    });
};

export default LocationService;
