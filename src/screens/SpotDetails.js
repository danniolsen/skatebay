import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

function SpotDetails(props) {
  props.navigation.setOptions({ headerTitle: null });
  return (
    <SafeAreaView style={s.container}>
      <Text>SpotDetails</Text>
    </SafeAreaView>
  );
}

export default SpotDetails;

const s = StyleSheet.create({
  container: { flex: 1 }
});
