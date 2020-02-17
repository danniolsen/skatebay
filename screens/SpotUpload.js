import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

function SpotUpload() {
  return (
    <SafeAreaView style={s.container}>
      <Text>SpotUpload</Text>
    </SafeAreaView>
  );
}

export default SpotUpload;

const s = StyleSheet.create({
  container: { flex: 1 }
});
