import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView } from "react-native";
import BottomTabNavigator from "./BottomTabNavigator";
import Auth from "../screens/Auth";
import SpotDetails from "../screens/SpotDetails";
import Settings from "../screens/Settings";
import Loading from "../screens/Loading";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

const Stack = createStackNavigator();

function MainNavigator(props) {
  const { loading } = props;

  return (
    <View style={{ flex: 1 }}>
      {loading.loading && <Loading />}
      {props.auth && !loading.loading && (
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator headerMode="none" mode="modal">
            <Stack.Screen name="root" component={BottomTabNavigator} />
            <Stack.Screen name="SpotDetails" component={SpotDetails} />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </SafeAreaView>
      )}
      {!props.auth && !loading.loading && (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
      )}
    </View>
  );
}

const mapStateToProps = state => ({
  loading: state.loading
});

export default connect(
  mapStateToProps,
  null
)(MainNavigator);
