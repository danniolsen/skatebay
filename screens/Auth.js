import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

function Auth() {
  return (
    <SafeAreaView style={s.container}>
      <Text>Auth</Text>
      <Text>facebook</Text>
      <Text>google</Text>
    </SafeAreaView>
  );
}

export default Auth;

const s = StyleSheet.create({
  container: { flex: 1 }
});
