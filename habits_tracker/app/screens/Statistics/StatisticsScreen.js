import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button, Dimensions } from "react-native";
import { Appbar } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import { useIsFocused } from "@react-navigation/native";
import { getTimersByUserId } from "../../services/habits";
import { getUserInfo } from "../../services/users";
import styles from "./styles";

export default function StatisticsScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [user, setUser] = useState({});
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    if (isFocused) {
      fetchTimers();
    }
  }, [isFocused]);

  const fetchTimers = async () => {
    try {
      const fetchedTimers = await getTimersByUserId(user.userId);
      setTimers(fetchedTimers);
      calculateMonthlyStatistics();
    } catch (error) {
      console.error("Error fetching timers:", error);
    }
  };

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

  const calculateMonthlyStatistics = () => {
    const stats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    timers.forEach((timer) => {
      const monthIndex = new Date(timer.date).getMonth();
      stats[monthIndex] += timer.durationSeconds;
    });
    return stats;
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: calculateMonthlyStatistics(),
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Action
          icon="account-circle"
          onPress={() => console.log("Profile")}
          color="#fff"
          size={40}
          style={{ marginLeft: "auto" }}
        />
        <Appbar.Content title={""} color="#fff" />
      </Appbar.Header>
      <ScrollView style={styles.block}>
        <Text style={styles.title}>
          Progressions /{"\n"}
          Statistiques
        </Text>
        <View>
          <Text style={{color: "white", textAlign: 'center', fontSize: 20, marginTop: 40, fontWeight: 'bold'}}>Temps passé par mois</Text>
          <LineChart
            data={lineChartData}
            width={Dimensions.get("window").width} // from react-native
            height={Dimensions.get("window").height / 2}
            formatYLabel={(yValue) => yValue + "s"}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              marginTop: 20
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
