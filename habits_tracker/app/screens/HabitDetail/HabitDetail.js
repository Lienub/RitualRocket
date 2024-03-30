import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  ProgressBarAndroid,
} from "react-native";
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
  const [repeatDays, setRepeatDays] = useState([]);
  const [daysElapsed, setDaysElapsed] = useState(0);

  // Récupérer les timers de la tâche pour la semaine en cours
  useEffect(() => {
    const days = task.repeatDays.split(",").map((day) => {
      switch (day) {
        case "sunday":
          return "Dimanche";
        case "monday":
          return "Lundi";
        case "tuesday":
          return "Mardi";
        case "wednesday":
          return "Mercredi";
        case "thursday":
          return "Jeudi";
        case "friday":
          return "Vendredi";
        case "saturday":
          return "Samedi";
        default:
          return "";
      }
    });
    setRepeatDays(days);
    const fetchDataAndComputeTimeSpent = async () => {
      try {
        const timers = await getTimersByTaskId(task.id, userId);

        const currentDate = new Date();

        const firstDayOfWeek = new Date(currentDate);
        firstDayOfWeek.setDate(
          firstDayOfWeek.getDate() - firstDayOfWeek.getDay()
        );

        const timeSpentForWeek = [0, 0, 0, 0, 0, 0, 0]; // Dimanche à Samedi

        timers.forEach((timer) => {
          const timerDate = new Date(timer.date);
          if (
            timerDate >= firstDayOfWeek &&
            timerDate <
              new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
          ) {
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

        const startDate = new Date(task.startDate);
        const elapsedMilliseconds = currentDate - startDate;
        const elapsedDays = Math.floor(
          elapsedMilliseconds / (1000 * 60 * 60 * 24)
        );
        setDaysElapsed(elapsedDays);
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
          <View style={styles.blockFollowing}>
            <View style={{ marginLeft: 6 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 15, color: "black" }}
              >
                Votre série{" "}
              </Text>
              <Text style={styles.followingText}>
                {daysElapsed === 0
                  ? "Vous n'avez pas encore commencé cette habitude."
                  : `Vous suivez cette habitude depuis ${daysElapsed} jours.`}
              </Text>
            </View>
            <Text style={styles.followingEmojy}>
              {daysElapsed === 0 ? "🚫" : "🔥"}
            </Text>
          </View>
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
          <View style={styles.blockStats}>
            <View style={styles.itemInfo}>
              <Text style={styles.statsTitle}>Objectif défini</Text>
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={20 / 100} 
                color="#007AFF" 
              />
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View style={styles.itemInfo}>
                <Text style={styles.statsTitle}>Répétition</Text>
                <View style={{ flexDirection: "row" }}>
                  <Ionicons name="calendar" size={30} color="black" />
                  <Text style={styles.statsValue}>
                    {task.repeatDays == ""
                      ? ""
                      : repeatDays.join(", ")}
                    {task.repeat == "none" && "une seule fois"}
                  </Text>
                </View>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.statsTitle}>Rappel</Text>
                <View style={{ flexDirection: "row" }}>
                  <Ionicons name="timer" size={30} color="black" />
                  <Text style={styles.statsValue}>{task.rappelTime}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <BarChart
            data={{
              labels: chartDays,
              datasets: [
                {
                  data: Object.values(timeSpent).map((seconds) => seconds / 60),
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
