import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import SpotList from "../screens/SpotList";
import Shops from "../screens/Shops";
import SpotUpload from "../screens/SpotUpload";
import ExploreMap from "../screens/ExploreMap";
import UserProfile from "../screens/UserProfile";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "SpotUpload";

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ title: null });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        showLabel: false
      }}
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
        name="Shops"
        component={Shops}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="shopping-bag" />
          )
        }}
      />

      <BottomTab.Screen
        name="SpotUpload"
        component={SpotUpload}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="plus-circle" />
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
