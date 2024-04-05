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
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - currentDayOfWeek);

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

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
  const calculateThisWeekStatistics = () => {
    const stats = [0, 0, 0, 0, 0, 0, 0];
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - currentDayOfWeek);

    const timersThisWeek = timers.filter((timer) => {
      const timerDate = new Date(timer.date);
      return timerDate >= firstDayOfWeek && timerDate <= today;
    });

    timersThisWeek.forEach((timer) => {
      const dayIndex = new Date(timer.date).getDay();
      stats[dayIndex] += timer.durationSeconds;
    });

    return stats;
  };

  const lineChartDataMonths = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: calculateMonthlyStatistics(),
        strokeWidth: 2,
      },
    ],
  };

  const lineChartDataLastDays = {
    labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
    datasets: [
      {
        data: calculateThisWeekStatistics(),
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Action
          icon="account-circle"
          onPress={() => navigation.navigate("Profile")}
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
          <Text
            style={{
              color: "white",
              fontSize: 25,
              marginTop: 40,
              marginLeft: 40,
              fontWeight: "bold",
            }}
          >
            Temps passé par mois
          </Text>
          <LineChart
            data={lineChartDataMonths}
            width={Dimensions.get("window").width}
            height={Dimensions.get("window").height / 2}
            formatYLabel={(yValue) => yValue + "s"}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {},
            }}
            bezier
            style={{
              marginVertical: 8,
              marginTop: 20,
              borderTopColor: "white",
              borderTopWidth: 4,
              borderBottomColor: "white",
              borderBottomWidth: 4,
            }}
          />
        </View>
        <View style={{ marginTop: 0 }}>
          <Text
            style={{
              color: "white",
              fontSize: 25,
              marginTop: 40,
              marginLeft: 40,
              fontWeight: "bold",
            }}
          >
            Temps passé cette semaine
          </Text>
          <Text style={{
              color: "white",
              fontSize: 15,
              textAlign: "center",
              fontWeight: "bold",
            }}>
          {startDate.toLocaleDateString("fr-FR")}{" "}
            - {endDate.toLocaleDateString("fr-FR")}
          </Text>
          <LineChart
            data={lineChartDataLastDays}
            width={Dimensions.get("window").width}
            height={Dimensions.get("window").height / 2}
            formatYLabel={(yValue) => yValue + "s"}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {},
            }}
            bezier
            style={{
              marginVertical: 8,
              marginTop: 20,
              borderTopColor: "white",
              borderTopWidth: 4,
              borderBottomColor: "white",
              borderBottomWidth: 4,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
