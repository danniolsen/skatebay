import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { getDistance } from "geolib";

const LocationService = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    return alert(
      "Location service is required in order to display the skatespots"
    );
  }

  let location = Location.getCurrentPositionAsync({});

  let geoLocation = {
    latitude: null,
    longitude: null,
    banner: {
      msg: null,
      style: null,
      show: false
    }
  };

  return location
    .then(loc => {
      geoLocation.latitude = loc.coords.latitude;
      geoLocation.longitude = loc.coords.longitude;
      return geoLocation;
    })
    .catch(err => {
      lgeoLocation.atitude = "00.000000";
      geoLocation.longitude = "00.00000";
      geoLocation.banner.msg =
        "Location service is required to show the skatespots";
      geoLocation.banner.style = "#ffc105";
      geoLocation.banner.show = true;

      return geoLocation;
    });
};

export const CheckImagesLocation = (prevLocation, imgLocation) => {
  let prevLat = prevLocation.location.latitude;
  let prevLon = prevLocation.location.longitude;
  let result = getDistance(
    { latitude: prevLat, longitude: prevLon },
    { latitude: imgLocation.latitude, longitude: imgLocation.longitude }
  );
  console.log(result);
  return result > 25 ? false : true;
};

export default LocationService;
