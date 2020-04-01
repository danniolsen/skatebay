"use-strict";

import * as React from "react";
import { View, StyleSheet, Text } from "react-native";

import Header from "../components/header/Header";

const Shops = (props) => (
  <View style={s.container}>
    <Header />
    <View style={s.textCon}>
      <Text style={{ marginBottom: 20 }}>TODO:</Text>

      <Text> - Create table: shops</Text>
      <Text> - Fetch shops based on location</Text>
      <Text> - Filter shops</Text>
      <Text> - Choose shop to redeam discount coupon</Text>
      <Text> - Enter shop, navigate</Text>
    </View>
  </View>
);

export default Shops;

const s = StyleSheet.create({
  container: { flex: 1 },
  textCon: { padding: 10 }
});
