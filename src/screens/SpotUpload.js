import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/header/Header";
function SpotUpload() {
  return (
    <View style={s.container}>
      <Header />
      <Text>SpotUpload</Text>
    </View>
  );
}

export default SpotUpload;

const s = StyleSheet.create({
  container: { flex: 1 }
});
