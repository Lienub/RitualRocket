import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Dimensions } from "react-native";
import { Appbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "react-native-elements";
import styles from "./styles";
import { BarChart } from "react-native-chart-kit";
import { getTimersByTaskId } from "../../services/habits";

export default function HabitDetailScreen({ navigation, route }) {
  const { task, userId } = route.params;
  const [chartDays, setChartDays] = useState([]);
  const [timeSpent, setTimeSpent] = useState({});

  // Récupérer les timers de la tâche pour la semaine en cours
  useEffect(() => {
    const fetchDataAndComputeTimeSpent = async () => {
      try {
        const timers = await getTimersByTaskId(task.id, userId);

        const currentDate = new Date();

        const firstDayOfWeek = new Date(currentDate);
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());

        const timeSpentForWeek = [0, 0, 0, 0, 0, 0, 0]; // Dimanche à Samedi

        timers.forEach(timer => {
          const timerDate = new Date(timer.date);
          if (timerDate >= firstDayOfWeek && timerDate < new Date(currentDate.getTime() + (7 * 24 * 60 * 60 * 1000))) {
            const dayOfWeek = timerDate.getDay();

            timeSpentForWeek[dayOfWeek] += timer.durationSeconds;
          }
        });

        setTimeSpent(timeSpentForWeek);
        const daysOfWeek = [
          "Dimanche",
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
        ];
        setChartDays(daysOfWeek);
      } catch (error) {
        console.error("Error fetching timers:", error);
      }
    };

    fetchDataAndComputeTimeSpent();
  }, [task]);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Action
          icon={() => <Ionicons name="close" size={30} color="#fff" />}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title={task.name} titleStyle={styles.title} />
        <Appbar.Action
          icon={() => <Ionicons name="trash" size={30} color="#fff" />}
          onPress={() => console.log("Delete: " + task.id)}
        />
      </Appbar.Header>
      <ScrollView>
        <View style={styles.infoContainer}>
          <Icon
            name={task.iconType}
            size={100}
            color={task.color}
            style={styles.icon}
          />
          <Text style={styles.name}>{task.name}</Text>
          <Text style={styles.description}>
            {task.description == "" ? "Pas description" : task.description}
          </Text>
          <Text style={styles.repeatDays}>
            {task.repeatDays == "" ? "" : chartDays.join(", ")}
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <BarChart
            data={{
              labels: chartDays,
              datasets: [
                {
                  data: Object.values(timeSpent).map(seconds => seconds / 60),
                },
              ],
            }}
            width={Dimensions.get("window").width}
            height={220}
            yAxisLabel="min"
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            style={{
              backgroundColor: "transparent",
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
