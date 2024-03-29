import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { getUserInfo } from "../../services/users";
import { getTasksByUserId } from "../../services/habits";
import styles from "./styles";

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasksByUserId(user.userId);
        setTasks(tasks);
        console.log("Tasks:", tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [user]);

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => {
      const endDate = new Date(task.endDate).toISOString().split("T")[0]
      const repeatDaysArray = task.repeatDays.split(",").map(day => day.replace(/"/g, "").trim());
      const selectedDayOfWeek = new Date(selectedDate).toLocaleString("en-US", { weekday: "long" }).toLowerCase();
      if (endDate < selectedDate) {
        return false;
      }
  
      if (repeatDaysArray.includes(selectedDayOfWeek)) {
        return true;
      }
      return false;
    });
    setFilteredTasks(filteredTasks);
  }, [selectedDate, tasks]);
  

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <CalendarStrip
          scrollable={true}
          scrollerPaging={true}
          calendarAnimation={{ type: "sequence", duration: 30 }}
          daySelectionAnimation={{
            type: "border",
            borderWidth: 2,
            borderHighlightColor: "white",
            duration: 300,
          }}
          style={styles.calendarStrip}
          calendarHeaderStyle={{ color: "white", fontSize: 20 }}
          dateNumberStyle={{ color: "white" }}
          dateNameStyle={{ color: "white" }}
          highlightDateNumberStyle={{ color: "white" }}
          highlightDateNameStyle={{ color: "white" }}
          selectedDate={selectedDate}
          onDateSelected={(date) => {
            setSelectedDate(date.toISOString().split("T")[0]);
          }}
        />
        <View style={styles.taskList}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                style={styles.taskItem}
                onPress={() => console.log("Task clicked:", task)}
              >
                <Text style={styles.taskName}>{task.name}</Text>
                <Text style={styles.taskDescription}>{task.description}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noTasks}>Pas d'habitudes à cette date</Text>
          )}
        </View>
      </View>
    </View>
  );
}
