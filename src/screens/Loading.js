import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ThinText } from "../components/StyledText";

function Loading() {
  return (
    <SafeAreaView style={s.container}>
      <ThinText>Loading ... </ThinText>
    </SafeAreaView>
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
