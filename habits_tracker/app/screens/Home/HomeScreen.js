import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import CalendarStrip from "react-native-calendar-strip";
import { Appbar } from "react-native-paper";
import { getUserInfo } from "../../services/users";
import { getTasksByUserId } from "../../services/habits";
import TimerView from "../../components/Timer/TimerView";
import { createTimer } from "../../services/habits";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function HomeScreen({ navigation }) {
  const [timer, setTimer] = useState(0);
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [closeModal, setCloseModal] = useState(true);

  const onChangeModalTimer = (task) => {
    setSelectedTask(task);
    setCloseModal(!closeModal);
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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasksByUserId(user.userId).then((tasks) => {
          setTasks(tasks);
        });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [user]);

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => {
      const endDate = new Date(task.endDate).toISOString().split("T")[0];
      const startDate = new Date(task.startDate).toISOString().split("T")[0];
      const repeatDaysArray = task.repeatDays
        .split(",")
        .map((day) => day.replace(/"/g, "").trim());
      const selectedDayOfWeek = new Date(selectedDate)
        .toLocaleString("en-US", { weekday: "long" })
        .toLowerCase();
      if (task.repeat === "none" && startDate === selectedDate) {
        return true;
      }
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

  useEffect(() => {
    if (timer > 0 && closeModal === true) {
      setTimer(0);
      let seconds = timer;
      const createTimerData = {
        taskId: selectedTask.id,
        userId: user.userId,
        durationSeconds: seconds,
      };
      createTimer(createTimerData);
    }

  
  }, [closeModal, setCloseModal, timer, setTimer]);


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
        <Appbar.Content
          title={"Bienvenue " + user.username}
          color="#fff"
        />
      </Appbar.Header>
      <View style={styles.block}>
        <Text style={styles.title}>
          {
            "Nous sommes le " + new Date(selectedDate).toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }
        </Text>
        <CalendarStrip
          scrollable={true}
          scrollerPaging={true}
          calendarAnimation={{ type: "sequence", duration: 30 }}
          daySelectionAnimation={{
            type: "border",
            duration: 300,
          }}
          style={styles.calendarStrip}
          calendarHeaderStyle={{ color: "#fff", fontSize: 20 }}
          dateNumberStyle={{ color: "white", fontSize: 20 }}
          dateNameStyle={{ color: "white", fontSize: 10 }}
          highlightDateNumberStyle={{
            color: "yellow",
            fontSize: 23,
            fontWeight: "bold",
          }}
          highlightDateNameStyle={{
            color: "yellow",
            fontSize: 14,
            fontWeight: "bold",
          }}
          selectedDate={selectedDate}
          onDateSelected={(date) => {
            setSelectedDate(date.toISOString().split("T")[0]);
          }}
        />
        <ScrollView style={styles.taskList}>
          <Text style={styles.title}>Consultez vos habitudes du jour!</Text>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <ListItem
                key={task.id}
                containerStyle={{
                  borderRadius: 20,
                  backgroundColor: "#363636",
                  width: "90%",
                  alignSelf: "center",
                  marginTop: 10,
                }}
                onPress={() => navigation.navigate("HabitDetail", { task, userId: user.userId })}
              >
                <Icon
                  name={task.iconType === "music" ? "rocket" : task.iconType}
                  type="material"
                  size={50}
                  color={task.color}
                />
                <ListItem.Content>
                  <ListItem.Title
                    style={{
                      color: task.color,
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    {task.name}
                  </ListItem.Title>
                  <ListItem.Subtitle
                    style={{
                      color: task.color,
                      fontWeight: "400",
                      fontSize: 20,
                      marginTop: 10,
                    }}
                  >
                    * Fonce !
                  </ListItem.Subtitle>
                </ListItem.Content>
                <Icon
                  name="timer"
                  type="material"
                  size={60}
                  color={task.color}
                  onPress={() => onChangeModalTimer(task)}
                />
              </ListItem>
            ))
          ) : (
            <Text style={styles.noTasks}>Pas d'habitudes à cette date</Text>
          )}
        </ScrollView>
        {closeModal === false && (
          <TimerView
            visible={!closeModal}
            setCloseModal={setCloseModal}
            setTimer={setTimer}
            task={selectedTask}
          />
        )}
      </View>
    </View>
  );
}
