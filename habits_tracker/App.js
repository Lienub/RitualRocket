import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { authUserExists } from "./app/services/users";
import SignupScreen from "./app/screens/Signup/SignupScreen";
import SigninScreen from "./app/screens/Signin/SigninScreen";
import MainNavigation from "./app/navigation/MainNavigation";

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
      <Stack.Navigator>
        {!userExists ? (
          <>
            <Stack.Screen
              name="Signin"
              component={SigninScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MainNavigation"
              component={MainNavigation}
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="MainNavigation"
            component={MainNavigation}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
