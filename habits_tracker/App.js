import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { authUserExists } from "./app/services/users";
import SignupScreen from "./app/screens/Signup/SignupScreen";
import SigninScreen from "./app/screens/Signin/SigninScreen";
import MainNavigation from "./app/navigation/MainNavigation";
import ResetPasswordScreen from "./app/screens/ResetPassword/ResetPassword";

const Stack = createNativeStackNavigator();

export default function App() {
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
    <NavigationContainer>
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
