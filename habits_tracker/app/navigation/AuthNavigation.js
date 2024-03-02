import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SigninScreen, SignupScreen } from "../screens";

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Signup">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}