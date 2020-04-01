import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import BottomTabNavigator from "./BottomTabNavigator";
import Auth from "../screens/Auth";
import SpotDetails from "../screens/SpotDetails";
import Settings from "../screens/Settings";
import Loading from "../screens/Loading";
import SpotVerification from "../screens/SpotVerification";
import Banner from "../components/banner/TopBanner";


const Stack = createStackNavigator();

function MainNavigator(props) {
  const { loading, banner, authState } = props;

  return (
    <View style={{ flex: 1 }}>
      {loading.loading && <Loading />}
      <Banner style={banner.style} msg={banner.msg} show={banner.show} />
      {authState && !loading.loading && (
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="root" component={BottomTabNavigator} />
            <Stack.Screen name="SpotDetails" component={SpotDetails} />
            <Stack.Screen name="SpotVerify" component={SpotVerification} />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </SafeAreaView>
      )}
      {!authState && !loading.loading && (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
      )}
    </View>
  );
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  auth: state.auth,
  banner: state.banner.banner
});

export default connect(
  mapStateToProps,
  null
)(MainNavigator);
