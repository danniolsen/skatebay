import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

function ExploreMap() {
  return (
    <SafeAreaView style={s.container}>
      <Text>ExploreMap</Text>
    </SafeAreaView>
  );
}

export default ExploreMap;

const s = StyleSheet.create({
  container: { flex: 1 }
});
