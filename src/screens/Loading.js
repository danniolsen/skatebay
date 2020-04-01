import React from "react";
import {
  View, StyleSheet, ActivityIndicator, ImageBackground
} from "react-native";

import { ThinText } from "../components/StyledText";

function Loading() {
  return (
    <ImageBackground
      source={require("../assets/images/loadingBackground.png")}
      style={s.container}
    >
      <ActivityIndicator size="large" style={s.spaceing} />
      <ThinText size={20} style={s.spaceing}>
        Loading
      </ThinText>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  spaceing: { marginBottom: 10, marginTop: 10 }
});

export default Loading;
