import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { ThinText } from "../StyledText";
const height = Dimensions.get("window").height;

function EmptyProfileList(props) {
  let msg = props.type === 0 ? "uploaded" : "saved";
  return (
    <View style={s.container}>
      <ThinText size={20}>You haven't {msg} any spots yet.</ThinText>
    </View>
  );
}

export { EmptyProfileList };

const s = StyleSheet.create({
  container: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center"
  }
});
