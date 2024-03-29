import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import CategoryListScreen from "../screens/Habits/CategoryList/CategoryList";
import HabitsListScreen from "../screens/Habits/HabitsList/HabitsList";
import TaskFormScreen from "../screens/Habits/HabitForm/TaskForm";

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="CategoryList">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CategoryList"
          component={CategoryListScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HabitsList"
          component={HabitsListScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TaskForm"
          component={TaskFormScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
