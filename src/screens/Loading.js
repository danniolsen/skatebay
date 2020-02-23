import React from "react";
import { View, StyleSheet } from "react-native";
import { ThinText } from "../components/StyledText";

function Loading() {
  return (
    <View style={s.container}>
      <ThinText>Loading ... </ThinText>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Loading;
