import React, { useState, useEffect, useMemo } from "react";
import { View, Text, ScrollView, Button, Dimensions, useColorScheme } from "react-native";
import { Appbar } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import { useIsFocused } from "@react-navigation/native";
import { getTimersByUserId } from "../../services/habits";
import { getStyles } from "./styles";
import { useTheme } from "../../components/Theme";

export default function StatisticsScreen({ navigation, route }) {
  const isFocused = useIsFocused();
  const { user } = route.params;
  const [timers, setTimers] = useState([]);
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const {theme} = useTheme();
  const styles = useMemo(() => getStyles(theme));

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
    labels: [
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche",
    ],
    datasets: [
      {
        data: calculateThisWeekStatistics(),
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.Content title={"Vos statistiques, " + user.username} color="#fff" />
        </Appbar.Header>
        <ScrollView style={styles.block}>
          {(user.username && user.username !== "") ? (
            <>
              <Text style={styles.title}>
                Progressions /
                Statistiques
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={styles.subtitle}
                >
                  Temps passé par mois
                </Text>
                <LineChart
                  data={lineChartDataMonths}
                  width={Dimensions.get("window").width * 0.9}
                  height={Dimensions.get("window").height / 2 * 0.9}
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
                  style={styles.chart}
                />
              </View>
              <View style={{
                marginTop: 0,
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "333px"
              }}>
                <Text
                  style={styles.subtitle}
                >
                  Temps passé cette semaine
                </Text>
                <Text
                  style={styles.subsubtitle}
                >
                  {startDate.toLocaleDateString("fr-FR")} -{" "}
                  {endDate.toLocaleDateString("fr-FR")}
                </Text>
                <LineChart
                  data={lineChartDataLastDays}
                  width={Dimensions.get("window").width * 0.9}
                  height={Dimensions.get("window").height / 2 * 0.9}
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
                  style={styles.chart}
                />
              </View>
            </>
          ) :
            (
              <Text style={styles.noTasks}>Pas d'habitudes à cette date</Text>
            )
          }
        </ScrollView>
      </View>
    </View>
  );
}
