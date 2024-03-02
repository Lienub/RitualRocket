// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Component / Screen imports
import SplashScreen from './app/components/SplashScreen';
import MainTest from './app/screens/MainTest';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTest" component={MainTest} options={{ headerShown: false, animation: 'none' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
