import { useLinking } from "@react-navigation/native";
import { Linking } from "expo";

export default function (containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl("/")],
    config: {
      Root: {
        path: "root",
        screens: {
          SpotList: "SpotList",
          ExploreMap: "ExploreMap",
          SpotUpload: "SpotUpload",
          UserProfile: "UserProfile",
          SpotDetails: "SpotDetails",
          Settings: "Settings",
          SpotVerify: "SpotVerify"
        }
      }
    }
  });
}
