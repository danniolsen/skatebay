import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/header/Header";

function ExploreMap() {
  return (
    <View style={s.container}>
      <Header />
      <Text>ExploreMap</Text>
    </View>
  );
}

export default ExploreMap;

const s = StyleSheet.create({
  container: { flex: 1 }
});
