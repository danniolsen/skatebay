import * as React from "react";
import { View, StyleSheet } from "react-native";
import { NormalText, ThinText } from "../StyledText";

const InputData = props => {
  return (
    <View style={s.container}>
      <NormalText>InputData</NormalText>
    </View>
  );
};

export default InputData;

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#DDE" }
});
