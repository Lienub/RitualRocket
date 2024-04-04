import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import StatisticsScreen from "../screens/Statistics/StatisticsScreen";
import CategoryListScreen from "../screens/Habits/CategoryList/CategoryList";
import {Profile} from "../screens/Profile/profile.js";
import {Settings} from "../screens/Settings/settings.js";
import {BottomTabBar} from "../components/BottomTabBar.js";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator 
    screenOptions={{
            tabBarStyle: {
              borderTopWidth: 0,
              elevation: 0,
            },
    }}
    tabBar={props => <BottomTabBar {...props} />}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Catégories" component={CategoryListScreen} />
    <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
  );
}
