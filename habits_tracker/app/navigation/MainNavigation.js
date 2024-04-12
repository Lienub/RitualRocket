import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryListScreen from "../screens/Habits/CategoryList/CategoryList";
import HabitsListScreen from "../screens/Habits/HabitsList/HabitsList";
import TaskFormScreen from "../screens/Habits/HabitForm/TaskForm";
import HabitDetailScreen from "../screens/HabitDetail/HabitDetail";
import TabNavigation from "./TabNavigation";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import ChangePassword from "../screens/ChangePassword/ChangePassword";
import SigninScreen from "../screens/Signin/SigninScreen";
import ChangeInformations from "../screens/ChangeInformations/ChangeInformations";

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <Stack.Navigator initialRouteName="TabNavigation" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="CategoryList" component={CategoryListScreen} />
      <Stack.Screen name="HabitsList" component={HabitsListScreen} />
      <Stack.Screen name="TaskForm" component={TaskFormScreen} />
      <Stack.Screen name="HabitDetail" component={HabitDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="ChangeInformations" component={ChangeInformations} />
    </Stack.Navigator>
  );
}