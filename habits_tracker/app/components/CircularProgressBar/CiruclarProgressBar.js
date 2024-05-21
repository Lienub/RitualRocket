import React, { useState, useEffect } from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { getTimersByUserId } from "../../services/habits";
import { COLORS } from "../../utils/constants/colors";

export default function CircularProgressBar({ date, user }) {
  const [timers, setTimers] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const scheme = useColorScheme();
  // TODO: Mettre colonne goalTime dans la table Tasks
  const goalTime = 4 * 60 * 60;

  useEffect(() => {
    fetchTimers();
  }, [date]);

  const fetchTimers = async () => {
    try {
      const fetchedTimers = await getTimersByUserId(user.userId);
      setTimers(fetchedTimers);
      calculateDailyStatistics();
    } catch (error) {
      console.error("Error fetching timers:", error);
    }
  };

  const calculateDailyStatistics = () => {
    const today = date;
    const timersToday = timers.filter((timer) => {
      let timerDate = new Date(timer.date);
      timerDate = new Date(timerDate.toISOString().split("T")[0]);
      return timerDate.toISOString().split("T")[0] === today;
    });
    const totalDurationToday = timersToday.reduce(
      (acc, timer) => acc + timer.durationSeconds,
      0
    )
    
    const percentage = totalDurationToday / goalTime;
    setPercentage(percentage);
  };

  return (
    <View style={styles.container}>
      <CircularProgress
        value={percentage * 100}
        inActiveStrokeColor={COLORS[scheme].text}
        inActiveStrokeOpacity={0.2}
        progressValueColor={COLORS[scheme].text}
        valueSuffix={"%"}
        radius={80}
        activeStrokeWidth={30}
        inActiveStrokeWidth={30}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
});
