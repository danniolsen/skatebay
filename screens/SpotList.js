import * as React from "react";
import { ThinText, NormalText } from "../components/StyledText";
import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from "react-native";

function SpotList(props) {
  let details = {
    id: "bla",
    location: "here"
  };
  return (
    <SafeAreaView style={s.container}>
      <ThinText>spot list</ThinText>
      <TouchableOpacity
        onPress={() => {
          props.navigation.push("SpotDetails", { details });
        }}
      >
        <Text>to details</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default SpotList;

const s = StyleSheet.create({
  container: { flex: 1 }
});
