import React, { Fragment, useEffect, useState } from "react";
import { Text, SafeAreaView } from "react-native";
import BottomTabNavigator from "./BottomTabNavigator";
import Auth from "../screens/Auth";
import SpotDetails from "../screens/SpotDetails";
import Loading from "../screens/Loading";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

function MainNavigator(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Fragment>
      {loading && <Loading />}
      {!props.auth && !loading && (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
      )}

      {props.auth && !loading && (
        <Stack.Navigator screenOptions={{ headerStyle: { height: 50 } }}>
          <Stack.Screen name="root" component={BottomTabNavigator} />
          <Stack.Screen name="SpotDetails" component={SpotDetails} />
        </Stack.Navigator>
      )}
    </Fragment>
  );
}

export default MainNavigator;
