import React, { useEffect, useMemo, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  ProgressBarAndroid,
  useColorScheme,
} from "react-native";
import * as Progress from 'react-native-progress'
import { Appbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "react-native-elements";
import { getStyles } from "./styles";
import { BarChart } from "react-native-chart-kit";
import { getTimersByTaskId, removeTask } from "../../services/habits";
import { useTheme } from "../../components/Theme"
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function HabitDetailScreen({ navigation, route }) {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme),);
  const { task, userId } = route.params;
  const [chartDays, setChartDays] = useState([]);
  const [timeSpent, setTimeSpent] = useState({});
  const [repeatDays, setRepeatDays] = useState([]);
  const [daysElapsed, setDaysElapsed] = useState(0);
  const removeTaskByTaskId = async (taskId) => {
    try {
      await removeTask(taskId);
      navigation.goBack();
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  const getCompletedDaysCount = (task) => {
    console.log(task);
    if (task.completedDates) {
      console.log(task.completedDates.split(',').length)
      return task.completedDates.split(',').length;
    }

    return 0;
  }

  console.log(Object.values(timeSpent).map((seconds) => seconds / 60))
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
        const newCount = getCompletedDaysCount({
          ...task,
        });

        setDaysElapsed(newCount);
        console.log("DAYS: ", daysElapsed)
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
        <Appbar.Content title={task.name} titleStyle={styles.appbarTitle} />
        <Appbar.Action
          icon={() => <Ionicons name="pencil" size={30} color="#fff" />}
          onPress={() => navigation.navigate("ModifyTask", { task })}
        />
        <Appbar.Action
          icon={() => <Ionicons name="trash" size={30} color="#fff" />}
          onPress={() => removeTaskByTaskId(task.id)}
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
            {task.description == "" ? "Pas de description" : task.description}
          </Text>
          <View style={styles.blockStats}>
            <View style={styles.itemInfo}>
              <Text style={styles.statsTitle}>Objectif défini</Text>
              <Progress.Bar
                styleAttr="Horizontal"
                indeterminate={false}
                progress={20 / 100}
                color="#007AFF"
                width={Dimensions.get("window").width * 0.7}
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
                  <Ionicons name="calendar" size={30} color={styles.iconColor} />
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
                  <Ionicons name="timer" size={30} color={styles.iconColor} />
                  <Text style={styles.statsValue}>{task.rappelTime}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <Text style={{ ...styles.title, marginBottom: 20, marginStart: 10 }}>Temps passé cette semaine</Text>
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
            formatYLabel={(yValue) => yValue}
            yAxisSuffix="min"
            chartConfig={styles.chartConfig}
            style={{
              borderRadius: "15",
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
