import * as React from "react";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";

const CheckConnection = () => {
  let connected = false;
  return NetInfo.fetch().then(net => {
    if (net.isConnected === false) {
      return {
        banner: { msg: "You seam to be offline", style: "#ffc105", show: true }
      };
    }
  });
};

export default CheckConnection;
