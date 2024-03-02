// Native imports
import { Platform } from 'react-native';
// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Component / Screen imports
import SplashScreen from './app/components/SplashScreen';
import MainTest from './app/screens/MainTest';

const Stack = createNativeStackNavigator();

export default function App() {
// Check if the platform is not web
  if (Platform.OS !== 'web') {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="MainTest" component={MainTest} options={{ headerShown: false, animation: 'none' }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // Render only main screen on web
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTest" headerMode="none">
        <Stack.Screen name="MainTest" component={MainTest} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
