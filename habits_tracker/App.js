// Native imports
import { Platform } from 'react-native';
// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Component / Screen imports
import SplashScreen from './app/components/SplashScreen';
import MainTest from './app/screens/MainTest';

const Tab = createBottomTabNavigator();

export default function App() {
// Check if the platform is not web
  if (Platform.OS !== 'web') {
    return (
      <NavigationContainer>
        <Tab.Navigator tabBar={props => <BottomTabBar {...props} state={{...props.state, routes: props.state.routes.slice(1,1)}} initialRouteName="Splash" headerMode="none"></BottomTabBar> }>
          <Tab.Screen name="Splash" component={SplashScreen} options={{ headerShown: false, tabBarStyle: { display: "none" }, tabBarVisible: false }}/>
          <Tab.Screen name="MainTest" component={MainTest} options={{ headerShown: false, animation: 'none' }}/>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  // Render only main screen on web
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="MainTest" headerMode="none">
        <Tab.Screen name="MainTest" component={MainTest} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
