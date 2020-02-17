import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import SpotList from "../screens/SpotList";
import ExploreMap from "../screens/ExploreMap";
import SpotUpload from "../screens/SpotUpload";
import UserProfile from "../screens/UserProfile";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "SpotList";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: null });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{ showLabel: false }}
    >
      <BottomTab.Screen
        name="SpotList"
        component={SpotList}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="layers" />
          )
        }}
      />
      <BottomTab.Screen
        name="ExploreMap"
        component={ExploreMap}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="globe" />
          )
        }}
      />

      <BottomTab.Screen
        name="SpotUpload"
        component={SpotUpload}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="upload-cloud" />
          )
        }}
      />

      <BottomTab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="user" />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}
