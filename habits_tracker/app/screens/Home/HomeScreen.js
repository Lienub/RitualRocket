import React, { useState, useEffect, useMemo } from "react";
import { View, Text, ScrollView, useColortheme, Image } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import CalendarStrip from "react-native-calendar-strip";
import { Appbar } from "react-native-paper";
import { getTasksByUserId, updateTask } from "../../services/habits";
import TimerView from "../../components/Timer/TimerView";
import { createTimer } from "../../services/habits";
import { useIsFocused } from "@react-navigation/native";
import CircularProgressBar from "../../components/CircularProgressBar/CiruclarProgressBar";
import { getStyles } from "./styles";
import { COLORS } from "../../utils/constants/colors";
import NiceSuccesModal from "../../components/NiceSuccessModal";
import { useTheme } from "../../components/Theme";

export default function HomeScreen({ navigation, route }) {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme));
  const isFocused = useIsFocused();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    if (isFocused) {
      fetchTasks();
    }
  }, [isFocused]);

  const [timer, setTimer] = useState(0);
  const { user } = route.params;
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  const [closeModal, setCloseModal] = useState(true);
  const [showCongratulationsModal, setShowCongratulationsModal] =
    useState(false);
  const [taskCompleted, setTaskCompleted] = useState(null);
  const [completedDaysCount, setCompletedDaysCount] = useState("");

  const updateTaskStatus = async (task, status) => {
    let completedDates = []
    if (!task.completedDates) {
      completedDates.push(selectedDate);
    } else {
      completedDates = task.completedDates.split(",");
      if (status === "done") {
        completedDates.push(selectedDate);
      } else {
        completedDates = completedDates.filter((date) => !date.includes(selectedDate));
      }
    }
    const taskData = {
      completedDates: completedDates.join(","),
    };
    setTaskCompleted(task.name);
    try {
      await updateTask(task.id, taskData);
      fetchTasks();

      if (status === "done") {
        const newCount = countCompletedDays({
          ...task,
          completedDates: completedDates.join(","),
        });
        setCompletedDaysCount(newCount);
        setShowCongratulationsModal(true);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const onChangeModalTimer = (task) => {
    setSelectedTask(task);
    setCloseModal(!closeModal);
  };

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasksByUserId(user.userId);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  useEffect(() => {
    const filterTasks = () => {
      const filteredTasks = tasks.filter((task) => {
        const endDate = new Date(task.endDate).toISOString().split("T")[0];
        const startDate = new Date(task.startDate).toISOString().split("T")[0];
        const repeatDaysArray = task.repeatDays
          .split(",")
          .map((day) => day.replace(/"/g, "").trim());
        const selectedDayOfWeek = new Date(selectedDate)
          .toLocaleString("en-US", { weekday: "long" })
          .toLowerCase();

        if (endDate < selectedDate) {
          return false;
        }

        if (task.repeat === "monthly") {
          const taskUpdatedDate = new Date(task.updatedAt);
          const selectedDayOfMonth = new Date(selectedDate).getDate();
          if (taskUpdatedDate.getDate() === selectedDayOfMonth) {
            return true;
          }
        }

        if (task.repeat === "weekly") {
          const taskUpdatedDate = new Date(task.updatedAt);
          const taskDayOfWeek = taskUpdatedDate
            .toLocaleString("en-US", { weekday: "long" })
            .toLowerCase();
          if (taskDayOfWeek === selectedDayOfWeek) {
            return true;
          }
        }

        if (startDate === selectedDate) {
          return true;
        }

        if (repeatDaysArray.includes(selectedDayOfWeek)) {
          return true;
        }
        return false;
      });
      setFilteredTasks(filteredTasks);
    };
    filterTasks();
  }, [selectedDate, tasks]);

  const verifyIfTaskCompleted = (task) => {
    if (task.completedDates) {
      const completedDates = task.completedDates.split(",");
      const isCompleted = completedDates.some((date) => date.includes(selectedDate));
      return isCompleted;
    }
    return false;
  }

  const countCompletedDays = (task) => {
    if (task.completedDates) {
      console.log(task.completedDates);
      return task.completedDates.split(',').length;
    }

    return 0;
  }

  useEffect(() => {
    if (timer > 0 && closeModal === true) {
      setTimer(0);
      const createTimerData = {
        taskId: selectedTask.id,
        userId: user.userId,
        durationSeconds: timer,
      };
      createTimer(createTimerData);
    }
  }, [closeModal, timer]);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title={`Bienvenue ${user.username}`} color="#fff" />
      </Appbar.Header>
      <View style={styles.block}>
        <Text style={styles.title}>
          {`Nous sommes le ${new Date(selectedDate).toLocaleDateString(
            "fr-FR",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}`}
        </Text>
        <CalendarStrip
          scrollable
          scrollerPaging
          calendarAnimation={{ type: "sequence", duration: 30 }}
          daySelectionAnimation={{ type: "border", duration: 300 }}
          style={styles.calendarStrip}
          calendarHeaderStyle={{ color: COLORS[theme].text, fontSize: 20 }}
          dateNumberStyle={{ color: COLORS[theme].text, fontSize: 20 }}
          dateNameStyle={{ color: COLORS[theme].text, fontSize: 10 }}
          highlightDateNumberStyle={{
            color: "orange",
            fontSize: 23,
            fontWeight: "bold",
          }}
          highlightDateNameStyle={{
            color: "orange",
            fontSize: 14,
            fontWeight: "bold",
          }}
          selectedDate={selectedDate}
          onDateSelected={(date) =>
            setSelectedDate(date.toISOString().split("T")[0])
          }
        />
        <NiceSuccesModal visible={showCongratulationsModal} onRequestClose={() => setShowCongratulationsModal(false)} taskTitle={taskCompleted} completedDaysCount={completedDaysCount} />
        <ScrollView style={styles.taskList}>
          <Text style={styles.title}>Consultez vos habitudes du jour!</Text>
          <CircularProgressBar date={selectedDate} user={user} tasks={filteredTasks} />
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <ListItem
                key={task.id}
                containerStyle={{
                  backgroundColor: verifyIfTaskCompleted(task)
                    ? "#42A445"
                    : COLORS[theme].tertiary,
                  alignSelf: "center",
                  marginTop: 5,
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: COLORS[theme].primary,
                  width: "95%",
                }}
                onPress={() =>
                  navigation.navigate("HabitDetail", {
                    task,
                    userId: user.userId,
                  })
                }
              >
                {verifyIfTaskCompleted(task) ? (
                  <Icon name="done" type="material" size={50} color="white" />
                ) : (
                  <Icon
                    name={task.iconType === "music" ? "rocket" : task.iconType}
                    type="material"
                    size={50}
                    color={task.color}
                  />
                )}
                <ListItem.Content>
                  <ListItem.Title
                    style={{
                      color: verifyIfTaskCompleted(task) ? "white" : task.color,
                      fontWeight: "bold",
                      fontSize: 20,
                      textDecorationLine: verifyIfTaskCompleted(task)
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {task.name}
                  </ListItem.Title>
                  <ListItem.Subtitle
                    style={{
                      color: verifyIfTaskCompleted(task) ? "white" : task.color,
                      fontWeight: 400,
                      fontSize: 20,
                      marginTop: 4,
                    }}
                  >
                    {verifyIfTaskCompleted(task) ? "* Bien joué" : "* Fonce !"}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <View>
                  {verifyIfTaskCompleted(task) ? (
                    <Icon
                      name="close"
                      type="material"
                      size={60}
                      color="red"
                      onPress={() => updateTaskStatus(task, "not_done")}
                    />
                  ) : (
                    <>
                      <Icon
                        name="done"
                        type="material"
                        size={40}
                        color="green"
                        onPress={() => updateTaskStatus(task, "done")}
                      />
                      <Icon
                        name="timer"
                        type="material"
                        size={40}
                        color={task.color}
                        onPress={() => onChangeModalTimer(task)}
                      />
                    </>
                  )}
                </View>
              </ListItem>
            ))
          ) : (
            <>
              <Text style={styles.noTasksTitle}>Aucune activité programmée</Text>
              <Text style={styles.noTasksDesc}>Ajouter de nouvelles activités</Text>
            </>
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
