import React, {useEffect, useState} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/Home/HomeScreen";
import StatisticsScreen from "../screens/Statistics/StatisticsScreen";
import CategoryListScreen from "../screens/Habits/CategoryList/CategoryList";
import { getUserInfo } from "../services/users";

const Tab = createBottomTabNavigator();

/**
 * This navigation manages tab navigation of the application
 */
export default function TabNavigation() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);
  return (
    <>
      {
        (user) ? (
          <Tab.Navigator initialRouteName="Home">
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
            initialParams={{ user }}
          />
          <Tab.Screen
            name="CategoryList"
            component={CategoryListScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="add" size={40} color={color} style={{fontWeight: 'bold'}} />
              ),
              tabBarLabel: () => null,
            }}
            initialParams={{ user }}
          />
          <Tab.Screen
            name="Statistics"
            component={StatisticsScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="stats-chart" size={size} color={color} />
              ),
            }}
            initialParams={{ user }}
          />
        </Tab.Navigator>
        ) : (
          <>
          </>
        )
      }
    </>
  )
}
