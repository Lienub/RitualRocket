import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { authUserExists } from "../services/users";
import SignupScreen from "../screens/Signup/SignupScreen";
import SigninScreen from "../screens/Signin/SigninScreen";
import MainNavigation from "../navigation/MainNavigation";
import ResetPasswordScreen from "../screens/ResetPassword/ResetPassword";

const Stack = createNativeStackNavigator();

/**
 * This navigation manages the application screens
 * before the user is logged in

 */
export default function AuthNavigation() {
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    checkUserExists();
  }, []);

  const checkUserExists = async () => {
    try {
      const exists = await authUserExists();
      setUserExists(exists);
    } catch (error) {
      console.error("Error checking user existence:", error.message);
    }
  };

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userExists ? (
          <>
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
            <Stack.Screen name="Home" component={MainNavigation} />
          </>
        ) : (
          <Stack.Screen name="MainNavigation" component={MainNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
