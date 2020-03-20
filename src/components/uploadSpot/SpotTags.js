import * as React from "react";
import { View, StyleSheet } from "react-native";
import { NormalText, ThinText } from "../StyledText";

const SpotTags = props => {
  return (
    <View style={s.container}>
      <NormalText>SpotTags</NormalText>
    </View>
  );
};

export default SpotTags;

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#CBD" }
});
