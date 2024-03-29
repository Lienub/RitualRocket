import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  Button,
  StyleSheet,
} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { Appbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

export default function HabitDetailScreen({ navigation, route }) {
  const { task } = route.params;
  const [days, setDays] = useState([]);

  useEffect(() => {
    const repeatDayList = task.repeatDays.split(",");
    setDays([]);
    repeatDayList.forEach((day) => {
      switch (day) {
        case "monday":
          setDays((prev) => [...prev, "Lundi"]);
          break;
        case "tuesday":
          setDays((prev) => [...prev, "Mardi"]);
          break;
        case "wednesday":
          setDays((prev) => [...prev, "Mercredi"]);
          break;
        case "thursday":
          setDays((prev) => [...prev, "Jeudi"]);
          break;
        case "friday":
          setDays((prev) => [...prev, "Vendredi"]);
          break;
        case "saturday":
          setDays((prev) => [...prev, "Samedi"]);
          break;
        case "sunday":
          setDays((prev) => [...prev, "Dimanche"]);
          break;
        default:
          break;
      }
    });
  }, []);
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
            {task.repeatDays == "" ? "" : days.join(", ")}
          </Text>
        </View>
        <View style={styles.statsContainer}></View>
      </ScrollView>
    </View>
  );
}
