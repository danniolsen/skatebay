import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/header/Header";

function SpotDetails(props) {
  return (
    <View style={s.container}>
      <Header
        leftIcon="chevron-down"
        leftAction={() => props.navigation.goBack()}
      />
      <Text>SpotDetails</Text>
    </View>
  );
}

export default SpotDetails;

const s = StyleSheet.create({
  container: { flex: 1 }
});
