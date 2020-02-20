import React, { Fragment } from "react";
import { Text, View } from "react-native";
import BottomTabNavigator from "./BottomTabNavigator";
import Auth from "../screens/Auth";
import SpotDetails from "../screens/SpotDetails";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

function MainNavigator(props) {
  return (
    <Fragment>
      {!props.auth && (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
      )}

      {props.auth && (
        <Stack.Navigator screenOptions={{ headerStyle: { height: 50 } }}>
          <Stack.Screen name="root" component={BottomTabNavigator} />
          <Stack.Screen name="SpotDetails" component={SpotDetails} />
        </Stack.Navigator>
      )}
    </Fragment>
  );
}

export default MainNavigator;

/*

*/
