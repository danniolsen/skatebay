import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

function UserProfile() {
  return (
    <SafeAreaView style={s.container}>
      <Text>UserProfile</Text>
    </SafeAreaView>
  );
}

export default UserProfile;

const s = StyleSheet.create({
  container: { flex: 1 }
});
