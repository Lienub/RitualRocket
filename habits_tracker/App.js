// Native imports
import { Platform, useColorScheme } from 'react-native';
// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabBar } from './app/components/BottomTabBar';
// Component / Screen imports
import SplashScreen from './app/components/SplashScreen';
import { authUserExists } from "./app/services/users";
import SignupScreen from "./app/screens/Signup/SignupScreen";
import SigninScreen from "./app/screens/Signin/SigninScreen";
import MainNavigation from "./app/navigation/MainNavigation";
import ResetPasswordScreen from "./app/screens/ResetPassword/ResetPassword";
// React imports
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthNavigation from "./app/navigation/AuthNavigation";
import { LogBox } from "react-native";
import { ThemeProvider } from './app/components/Theme';

const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs();

export default function App() {
  const [userExists, setUserExists] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  const checkUserExists = async () => {
    try {
      const exists = await authUserExists();
      setUserExists(exists);
    } catch (error) {
      console.error("Error checking user existence:", error.message);
    }
  };

  useEffect(() => {
    // Loading of assets
    const loadAssets = async () => {
      // Simulating asset loading for 3 seconds (the duration of the animation)
      await new Promise(resolve => setTimeout(resolve, 3800));

      /* 
        PUT HERE THE ASSETS THAT HAVE TO BE LOADED
      */
      checkUserExists();

      setAssetsLoaded(true);
    };

    loadAssets();
  }, []);

  if (!assetsLoaded && Platform.OS !== 'web') {
    return <SplashScreen assetsLoaded={assetsLoaded} />;
  }

  return (
    <ThemeProvider>
      <NavigationContainer
        style={{ marginBottom: 20 }}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}