// Native imports
import { Platform } from 'react-native';
// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {BottomTabBar} from './app/components/BottomTabBar';
// Component / Screen imports
import SplashScreen from './app/components/SplashScreen';
import MainTest from './app/screens/MainTest';
// React imports
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function App() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    // Loading of assets
    const loadAssets = async () => {
      // Simulating asset loading for 3 seconds (the duration of the animation)
      await new Promise(resolve => setTimeout(resolve, 3800));

      /* 
        PUT HERE THE ASSETS THAT HAVE TO BE LOADED
      */

      setAssetsLoaded(true);
    };

    loadAssets();
  }, []);


  if (!assetsLoaded && Platform.OS !== 'web') {
    return <SplashScreen assetsLoaded={assetsLoaded} />;
  }

  return (
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={{
                  tabBarStyle: {
                    borderTopWidth: 0,
                    elevation: 0,
                  },
          }}
          tabBar={props => <BottomTabBar {...props} />}
        >
          <Tab.Screen name="Home" component={MainTest} />
          <Tab.Screen name="Calendar" component={MainTest} />
          <Tab.Screen name="Completed" component={MainTest} />
          <Tab.Screen name="Profile" component={MainTest} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
