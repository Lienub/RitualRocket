import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryListScreen from "../screens/Habits/CategoryList/CategoryList";
import HabitsListScreen from "../screens/Habits/HabitsList/HabitsList";
import TaskFormScreen from "../screens/Habits/HabitForm/TaskForm";
import HabitDetailScreen from "../screens/HabitDetail/HabitDetail";
import TabNavigation from "./TabNavigation";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import ChangePassword from "../screens/ChangePassword/ChangePassword";
import AuthNavigation from "../navigation/AuthNavigation";
import ChangeInformations from "../screens/ChangeInformations/ChangeInformations";
import { getUserInfo } from "../services/users";

const Stack = createNativeStackNavigator();

/**
 * This navigation manages the application screens 
 * when the user is logged in
 */
export default function MainNavigation() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);
  return (
    <>
      {user.userId ? (
        <Stack.Navigator
          initialRouteName="TabNavigation"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="CategoryList" component={CategoryListScreen} initialParams={{ user }} />
          <Stack.Screen name="HabitsList" component={HabitsListScreen} initialParams={{ user }} />
          <Stack.Screen name="TaskForm" component={TaskFormScreen} initialParams={{ user }} />
          <Stack.Screen name="HabitDetail" component={HabitDetailScreen} initialParams={{ user }} />
          <Stack.Screen name="Profile" component={ProfileScreen}  initialParams={{ user }} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} initialParams={{ user }} />
          <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
          <Stack.Screen
            name="ChangeInformations"
            component={ChangeInformations}
            initialParams={{ user }}
          />
        </Stack.Navigator>
      ) : (
        <></>
      )}
    </>
  );
}
