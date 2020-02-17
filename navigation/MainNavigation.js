import React, { Fragment } from "react";
import { Text, View } from "react-native";
import BottomTabNavigator from "./BottomTabNavigator";
import Auth from "../screens/Auth";
import SpotDetails from "../screens/SpotDetails";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

function MainNavigator(props) {
  return (
    <Stack.Navigator>
      {props.auth && <Stack.Screen name="Auth" component={Auth} />}
      {!props.auth && (
        <>
          <Stack.Screen name="root" component={BottomTabNavigator} />
          <Stack.Screen name="SpotDetails" component={SpotDetails} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default MainNavigator;
